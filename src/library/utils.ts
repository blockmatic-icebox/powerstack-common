import { verify, sign } from 'jsonwebtoken';
import { config } from '../config';
import { ClaimValueType, HasuraUser, Session, User } from '../types';

const jwtKey = config.jwt_secret;
const jwtExpirySeconds = config.jwt_token_expiration;

export const generateCustomClaims = async (userId: string) => {
  return {};
};

export const generateHasuraClaims = async (
  user: HasuraUser
): Promise<{
  [key: string]: ClaimValueType;
}> => {
  const allowedRoles = user.roles.map((role) => role.role);

  // add user's default role to allowed roles
  if (!allowedRoles.includes(user.defaultRole)) {
    allowedRoles.push(user.defaultRole);
  }

  const customClaims = await generateCustomClaims(user.id);
  return {
    ...customClaims,
    [`x-hasura-allowed-roles`]: allowedRoles,
    [`x-hasura-default-role`]: user.defaultRole,
    [`x-hasura-user-id`]: user.id,
    [`x-hasura-user-is-anonymous`]: user.isAnonymous.toString(),
  };
};

export const verifyToken = (token: string) => {
  if (!token) {
    return new Error('Invalid token');
  }
  let decoded_token;
  try {
    decoded_token = verify(token, jwtKey);
  } catch (e) {
    return new Error('Invalid token');
  }
  return decoded_token;
};

export const getRefreshToken = (token: string, session) => {
  if (!token) {
    return new Error('Invalid token');
  }

  try {
    verify(token, jwtKey);
  } catch (e) {
    return new Error('Invalid token');
  }
  const newToken = sign(session, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });

  return newToken;
};

export const getSessionToken = (session) => {
  const token = sign(session, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds,
  });
  return token;
};

const getUser = (user): User => ({
  id: user.id,
  name: user.displayName,
  username: user.username,
});

export const createHasuraAccessToken = async (user) => {
  return getSessionToken(user); // TODO: implement
};

export const getNewOrUpdateCurrentSession = async ({
  user,
  currentRefreshToken,
}: {
  user;
  currentRefreshToken?: string;
}): Promise<Session> => {
  const sessionUser = await getUser(user);
  const accessToken = await createHasuraAccessToken(sessionUser);
  const refreshToken = accessToken; // TODO
  return {
    accessToken,
    accessTokenExpiresIn: config.jwt_token_expiration,
    refreshToken,
    user: sessionUser,
  };
};
