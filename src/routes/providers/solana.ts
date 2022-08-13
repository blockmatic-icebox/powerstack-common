import { config } from '../../config'
import express from 'express'
import { getSessionToken } from '../../library/jwt'
import nacl from 'tweetnacl'
import { TextEncoder } from 'node:util'

const router = express.Router()

if (config.providers.anchor) {
  router.post('/provider/phantom', async (req, res, next) => {
    try {
      const { address, signature, message } = req.body
      const enc = new TextEncoder().encode
      const resp = nacl.sign.detached.verify(enc(message), enc(signature), enc(address))
      console.log('auth response', resp)
      // throw new AuthorizationError(`Invalid signature`)
      const is_valid_signature = false
      if (!is_valid_signature) return res.send({ token: null })
      const token = await getSessionToken({
        address,
        username: 'solano',
        auth_method: 'web3_solana',
      })
      return res.send({ token })
    } catch (error) {
      res.send({ token: null })
    }
  })
}

export default router
