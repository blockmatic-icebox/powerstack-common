import { verify, sign } from 'jsonwebtoken'
import { TokenPayload, LoginUserInfo } from '../types'
import { config } from '../config'
import { prisma } from './prisma'

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
export const getTokenPayload = async ({
  login_address,
  auth_method,
}: LoginUserInfo): Promise<TokenPayload> => {
  // TODO: find user by login_address
  const user_data = await prisma.accounts.findFirst({
    where: {
      username: 'gaboesquivel',
    },
    include: {
      addresses: true,
    },
  })

  const token_payload: TokenPayload = {
    user: {
      account_id: user_data.account_id,
      username: user_data.username,
      auth_method: 'web3_solana',
      addresses: user_data.addresses.map((address) => {
        // TODO: get balances
        return { ...address, ticker: '', balance: '', unit_balance: '' }
      }),
    },
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': 'id',
      'x-hasura-user-username': 'username',
      'x-hasura-user-addresses': ['one', 'two'],
      'x-hasura-user-login-method': auth_method,
    },
  }

  return token_payload
}

export const getTokenSession = async (token_user_info: LoginUserInfo) => {
  try {
    const normalized_user = await getNormalizedUser(token_user_info)
    const hasura_claims_user_session = await getTokenPayload(token_user_info)
    const token = sign(
      {
        user: normalized_user,
        'https://hasura.io/jwt/claims': hasura_claims_user_session,
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
