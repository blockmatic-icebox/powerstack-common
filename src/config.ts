import * as env from 'env-var'

interface Providers {
  twitter?: {
    client_type: string
    consumer_key: string
    consumer_secret: string
    callback_url: string
    client_id: string
    client_secret: string
  }
  anchor?: {}
}
export interface Config {
  hostname: string
  port: number
  server_secret: string
  jwt_secret: string
  jwt_token_expiration: number
  providers: Providers
}

export const config: Config = {
  hostname: env.get('HOSTNAME').asString() || '0.0.0.0',
  port: env.get('PORT').asIntPositive() || 4000,
  server_secret: env.get('SERVER_SECRET').asString(),
  jwt_secret: env.get('JWT_SECRET').asString(),
  jwt_token_expiration: env.get('JWT_TOKEN_EXPIRATION').asIntPositive(),
  providers: {
    twitter: {
      client_type: 'CONFIDENTIAL',
      consumer_key: env.get('TWITTER_CONSUMER_KEY').asString(),
      consumer_secret: env.get('TWITTER_CONSUMER_SECRET').asString(),
      callback_url: env.get('TWITTER_CALLBACK').asString(),
      client_id: env.get('TWITTER_CLIENT_ID').asString(),
      client_secret: env.get('TWITTER_CLIENT_SECRET').asString(),
    },
    anchor: {},
  },
}
