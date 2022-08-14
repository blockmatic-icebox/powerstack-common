import { verify, sign } from 'jsonwebtoken'
import { ClaimValueType, TokenUserInfo } from '../types'
import { config } from '../config'

const jwt_name_space = config.jwt_secret.claims_namespace || 'https://hasura.io/jwt/claims'

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

const getNormalizedUser = async ({ username, address, auth_method }: TokenUserInfo) => {
  // Here we can perfome validations but right now it is very simple
  const user = { username, address, auth_method }
  return user
}

// WIP: perform hasura claims please
export const generateHasuraClaims = async ({
  username,
  address,
  auth_method,
}: TokenUserInfo): Promise<{
  [key: string]: ClaimValueType
}> => {
  // At this moment we only support user role
  // TODO: use claim mapping
  // https://hasura.io/docs/latest/auth/authentication/jwt/
  return {
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-default-role': 'user',
    'x-hasura-user-username': username,
    'x-hasura-user-address': address,
    'x-hasura-user-auth-method': auth_method,
  }
}

export const getTokenSession = async (userTokenInfo: TokenUserInfo) => {
  try {
    const normalized_user = await getNormalizedUser(userTokenInfo)
    const hasura_claims_user_session = await generateHasuraClaims(userTokenInfo)
    const token = sign(
      {
        user: normalized_user,
        [jwt_name_space]: hasura_claims_user_session,
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
