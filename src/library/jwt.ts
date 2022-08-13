import { verify, sign } from 'jsonwebtoken'
import { TokenUserInfo } from '../types'
import { config } from '../config'

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

export const getSessionToken = async ({ username, address, auth_method }: TokenUserInfo) =>
  sign(
    {
      username,
      address,
      auth_method,
      ['https://hasura.io/jwt/claims']: {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-username': username,
        'x-hasura-user-address': address,
        'x-hasura-user-auth-method': 'auth_method',
      },
    },
    config.jwt_secret.key,
    {
      algorithm: config.jwt_secret.type,
      expiresIn: config.jwt_token_expiration,
    },
  )
