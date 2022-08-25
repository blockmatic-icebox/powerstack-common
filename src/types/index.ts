export type Address = string

export type AuthMethod =
  | 'web2_twitter'
  | 'web3_solana'
  | 'web3_anchor'
  | 'web3_metamask'
  | 'web3_auth'

export interface AuthInfo {
  login_username?: string // web2
  login_network?: string // web3
  login_address?: Address // web3
  login_method: AuthMethod
}

export type HasuraClaimValueType =
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
  'x-hasura-user-auth-method': AuthMethod
  [key: string]: HasuraClaimValueType
}
export interface TokenUser {
  account_id: string
  session_id: string
  username?: string
  auth_method: AuthMethod
}
export interface TokenPayload {
  user: TokenUser
  'https://hasura.io/jwt/claims': HasuraClaims
}
