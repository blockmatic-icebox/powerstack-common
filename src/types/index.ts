export type Address = string

export type AuthMedthod = 'web2_twitter' | 'web3_solana' | 'web3_evm' | 'web3_anchor'
export interface LoginUserInfo {
  login_address: Address
  auth_method: AuthMedthod
}

export type AppLoginMethod =
  | 'web2_twitter'
  | 'web3_solana'
  | 'web3_anchor'
  | 'web3_metamask'
  | 'web3_auth'

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
  'x-hasura-user-address': string
  'x-hasura-user-auth-method': AuthMedthod
  [key: string]: HasuraClaimValueType
}
export interface AppUser {
  account_id: string
  username?: string
  auth_method: AppLoginMethod
  addresses: AppUserAddress[]
}
export interface AppUserAddress {
  address: string
  network: string
  ticker: string
  balance: string // in decimal notation
  unit_balance: string // balance in smallest unit. eg. wei
}

export interface TokenPayload {
  user: AppUser
  'https://hasura.io/jwt/claims': HasuraClaims
}
