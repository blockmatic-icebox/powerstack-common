import { verify, sign } from 'jsonwebtoken'
import { config } from '../config'
import { Session } from '../types'

const jwtKey = config.jwt_secret
const jwtExpirySeconds = config.jwt_token_expiration

export const verifyToken = (token: string) => {
  if (!token) {
    return new Error('Invalid token')
  }
  let decoded_token
  try {
    decoded_token = verify(token, jwtKey)
  } catch (e) {
    return new Error('Invalid token')
  }
  return decoded_token
}

export const getRefreshToken = (token: string, session) => {
  if (!token) {
    return new Error('Invalid token')
  }

  try {
    verify(token, jwtKey)
  } catch (e) {
    return new Error('Invalid token')
  }
  const newToken = sign(session, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  })

  return newToken
}

export const getSessionToken = (session) => {
  const token = sign(session, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  })
  return token
}

const getUser = (user) => ({
  id: user.id,
  name: user.displayName,
  photos: user.photos,
})

export const createHasuraAccessToken = async (user) => {
  return getSessionToken(user) // TODO: implement
}

export const getNewOrUpdateCurrentSession = async ({
  user,
  currentRefreshToken,
}: {
  user
  currentRefreshToken?: string
}): Promise<Session> => {
  const sessionUser = await getUser(user)
  const accessToken = await createHasuraAccessToken(sessionUser)
  const refreshToken = accessToken // TODO
  return {
    accessToken,
    accessTokenExpiresIn: config.jwt_token_expiration,
    refreshToken,
    user: sessionUser,
  }
}
