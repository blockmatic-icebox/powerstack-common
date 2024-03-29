# PowerStack Auth

PowerStack JWT authentication server.

⚡️ [PowerStack: a powerful fullstack development framework](https://powerstack.xyz).

_Disclaimer: This is a work in progress. Will be finalized soon._

## Core Features:

- 🔑 Multiple web2 and web3 sign-in methods.
- ✨ Integrates with Hasura Engine permissions
- 🔐 JWT tokens and refresh tokens.

## Sign in methods:

- **Email and Password** - simple email and password method.
- **Email** - also called **passwordless email** or **magic link**.
- **Anonymous** - sign in users without any method. Anonymous users can be
  converted to _regular_ users.
- **Auth providers**:
  - Metamask
  - Phantom
  - Anchor
  - GitHub
  - Twitter
  - GitLab
  - BitBucket
  - Facebook
  - Google

## JWT and OAuth2

JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties

[jwt.io](http://jwt.io) allows you to decode, verify and generate JWT.

OAuth 2.0 is the industry-standard protocol for authorization. Learn more at [oauth.net/2/](https://oauth.net/2)

![image](https://user-images.githubusercontent.com/391270/184449766-90b00732-7fa3-4cf8-9986-892ff5686b8e.png)

## JWT Payload Standard

```ts
{
  username: 'powerstack',
  address: '0x',
  auth_method: 'web3_solana',
  ['https://hasura.io/jwt/claims']: {
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-default-role': 'user',
    'x-hasura-user-username': 'powerstack',
    'x-hasura-user-address': '0x',
    'x-hasura-user-auth-method': 'web3_solana',
  },
},
```

## Docker

```
# Build the image
docker build -t powerstack-auth:local .

# Start a container
docker run --name powerstack-auth --env-file .env -p 4001:4001 -d powerstack-auth:local

# Get container ID
docker ps -aqf "name=^powerstack-auth$"

# Print app output
docker logs -f powerstack-auth

# Stop, start, restart, kill
docker stop powerstack-auth
docker start powerstack-auth
docker restart powerstack-auth
docker kill powerstack-auth
```

## Contributing

We use a [Discussions Board](https://github.com/blockmatic/powerstack-docs/discussions/1) to gather thoughts, bug reports and feature requests from the community.

Follow the standard Github Flow for PRs. [Contributing Guidelines](https://docs.powerstack.xyz/powerstack/other-resources/contributing-guidelines).

## Blockmatic

Blockmatic is building a robust ecosystem of people and tools for the development of blockchain applications.

[blockmatic.io](https://blockmatic.io)

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->

<!-- display the social media buttons in your README -->

[![Blockmatic Twitter][1.1]][1]
[![Blockmatic Facebook][2.1]][2]
[![Blockmatic Github][3.1]][3]

<!-- links to social media icons -->
<!-- no need to change these -->

<!-- icons with padding -->

[1.1]: http://i.imgur.com/tXSoThF.png 'twitter icon with padding'
[2.1]: http://i.imgur.com/P3YfQoD.png 'facebook icon with padding'
[3.1]: http://i.imgur.com/0o48UoR.png 'github icon with padding'

<!-- icons without padding -->

[1.2]: http://i.imgur.com/wWzX9uB.png 'twitter icon without padding'
[2.2]: http://i.imgur.com/fep1WsG.png 'facebook icon without padding'
[3.2]: http://i.imgur.com/9I6NRUm.png 'github icon without padding'

<!-- links to your social media accounts -->
<!-- update these accordingly -->

[1]: http://www.twitter.com/blockmatic_io
[2]: http://fb.me/blockmatic.io
[3]: http://www.github.com/blockmatic

<!-- Please don't remove this: Grab your social icons from https://github.com/carlsednaoui/gitsocial -->
