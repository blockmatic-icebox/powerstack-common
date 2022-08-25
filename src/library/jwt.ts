import { verify, sign } from 'jsonwebtoken'
import { TokenPayload, AuthInfo } from '../types'
import { config } from '../config'
import { getOrCreateAccount, prisma } from './prisma'
import { randomUUID } from 'node:crypto'

export const verifyToken = (token: string) => {
  if (!token) return new Error('Invalid token')
  let decoded_token
  try {
    decoded_token = verify(token, config.jwt_secret.key)
    console.log({ decoded_token })
  } catch (error) {
    console.log('error', error)
    return new Error('Invalid token')
  }
  return decoded_token
}

export const getRefreshToken = (token: string, session) => {
  if (!token) return new Error('Invalid token')
  try {
    verify(token, config.jwt_secret.key)
  } catch (error) {
    return new Error('Invalid token')
  }
  const new_token = sign(session, config.jwt_secret.key, {
    algorithm: config.jwt_secret.type,
    expiresIn: config.jwt_token_expiration,
  })
  return new_token
}

// https://hasura.io/docs/latest/auth/authentication/jwt/
export const getTokenPayload = async (auth_info: AuthInfo): Promise<TokenPayload> => {
  const account = await getOrCreateAccount(auth_info)
  const session_id = randomUUID()
  const token_payload: TokenPayload = {
    user: {
      account_id: account.account_id,
      session_id,
      username: account.username,
      auth_method: auth_info.login_method,
    },
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-account-id': account.account_id,
      'x-hasura-user-username': account.username,
      'x-hasura-user-auth-method': auth_info.login_method,
    },
  }
  return token_payload
}

export const getTokenSession = async (auth_info: AuthInfo) => {
  try {
    const token_payload = await getTokenPayload(auth_info)
    const token = sign(
      {
        ...token_payload,
      },
      config.jwt_secret.key,
      {
        algorithm: config.jwt_secret.type,
        expiresIn: config.jwt_token_expiration,
      },
    )

    return token
  } catch (error) {
    console.log('getTokenSession Error', error)
    return null
  }
}
