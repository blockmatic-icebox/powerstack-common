export type Address = string

export type ClaimValueType =
  | string
  | string[]
  | number
  | number[]
  | RegExp
  | RegExp[]
  | boolean
  | boolean[]
  | null
  | undefined

export interface HasuraClaims {
  'x-hasura-user-id': string
  'x-hasura-default-role': string
  'x-hasura-allowed-roles': string[]
  'x-hasura-user-address': Address
  [key: string]: ClaimValueType
}

export interface TokenUserInfo {
  address: string
  username: string
}

// export interface PermissionVariables {
//   'user-id': string
//   'default-role': string
//   'allowed-roles': string[]
//   [key: string]: ClaimValueType
// }

// export type Token = {
//   [key: string]: Claims
// } & {
//   'https://hasura.io/jwt/claims': Claims
//   exp: bigint
//   iat: bigint
//   iss: string
//   sub: string
// }
// export type Session = {
//   accessToken: string
//   accessTokenExpiresIn: number
//   refreshToken: string
//   user?: User
// }
