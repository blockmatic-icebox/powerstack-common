export type Address = string

export type AuthMedthod = 'web2_twitter' | 'web3_solana' | 'web3_evm' | 'web3_anchor'

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
  username?: string // TODO: validate
  auth_method: AuthMedthod
}
