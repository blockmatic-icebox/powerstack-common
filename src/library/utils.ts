import { verify, sign } from 'jsonwebtoken';
import { config } from '../config';
import { ClaimValueType, HasuraUser, Session, User } from '../types';

const jwt = config.jwt_secret;
const jwt_token_expiration = config.jwt_token_expiration;

export const generateCustomClaims = async (userId: string) => {
  return {};
};

// TODO: use user
// user: HasuraUser
export const generateHasuraClaims = async (): Promise<{
  [key: string]: ClaimValueType;
}> => {
  // const allowedRoles = user.roles.map((role) => role.role);

  // // add user's default role to allowed roles
  // if (!allowedRoles.includes(user.defaultRole)) {
  //   allowedRoles.push(user.defaultRole);
  // }

  // const customClaims = await generateCustomClaims(user.id);
  // return {
  //   ...customClaims,
  //   [`x-hasura-allowed-roles`]: allowedRoles,
  //   [`x-hasura-default-role`]: user.defaultRole,
  //   [`x-hasura-user-id`]: user.id,
  //   [`x-hasura-user-is-anonymous`]: user.isAnonymous.toString(),
  // };
  return {
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-default-role': 'user',
    'x-hasura-user-id': '1234567890',
    'x-hasura-org-id': '123',
  };
};

export const verifyToken = (token: string) => {
  if (!token) {
    return new Error('Invalid token');
  }
  let decoded_token;
  try {
    decoded_token = verify(token, jwt.key);
    console.log({ decoded_token });
  } catch (error) {
    console.log('error', error);
    return new Error('Invalid token');
  }
  return decoded_token;
};

export const getRefreshToken = (token: string, session) => {
  if (!token) {
    return new Error('Invalid token');
  }

  try {
    verify(token, jwt.key);
  } catch (e) {
    return new Error('Invalid token');
  }
  const newToken = sign(session, jwt.key, {
    algorithm: jwt.type,
    expiresIn: jwt_token_expiration,
  });

  return newToken;
};

// TODO: WIP please add a better support
const getNormalizedUser = async (userProvider): Promise<User> => {
  const { user } = userProvider;
  return {
    id: user.id,
    name: user.name,
    username: user.username,
  };
};

export const getSessionToken = async (user) => {
  console.log({ 'input: user': user });
  const jwt_name_space = jwt.claims_namespace ? jwt.claims_namespace : 'https://hasura.io/jwt/claims';
  const normalized_user = await getNormalizedUser(user);
  const hasura_claims_user_session = await generateHasuraClaims();
  console.log({
    hasura_claims_user_session,
    normalized_user,
  });
  const token = sign(
    {
      user: normalized_user,
      [jwt_name_space]: await generateHasuraClaims(),
    },
    jwt.key,
    {
      algorithm: jwt.type,
      expiresIn: jwt_token_expiration,
    }
  );
  return token;
};

// TODO: this is a WIP please just keep for reference
// export const getNewOrUpdateCurrentSession = async ({
//   user,
//   currentRefreshToken,
// }: {
//   user;
//   currentRefreshToken?: string;
// }): Promise<Session> => {
//   const sessionUser = await getUser(user);
//   const accessToken = await createHasuraAccessToken(sessionUser);
//   const refreshToken = accessToken; // TODO
//   return {
//     accessToken,
//     accessTokenExpiresIn: config.jwt_token_expiration,
//     refreshToken,
//     user: sessionUser,
//   };
// };

// const getUser = (user): User => ({
//   id: user.id,
//   name: user.displayName,
//   username: user.username,
// });

// export const createHasuraAccessToken = async (user) => {
//   const hasura_claims_user_session = await generateHasuraClaims(user);
//   console.log({ createHasuraAccessToken });
//   return getSessionToken(hasura_claims_user_session); // TODO: implement
// };
