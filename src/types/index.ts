export type Address = string

export type AuthMedthod =
  | 'web2_twitter'
  | 'web3_web3auth'
  | 'web3_solana'
  | 'web3_evm'
  | 'web3_anchor'

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
  'x-hasura-default-role': string
  'x-hasura-allowed-roles': string[]
  'x-hasura-user-username': Address
  'x-hasura-user-address': string
  'x-hasura-user-auth-method': AuthMedthod
  [key: string]: ClaimValueType
}

export interface TokenUserInfo {
  address: Address
  username: string
  auth_method: AuthMedthod
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
