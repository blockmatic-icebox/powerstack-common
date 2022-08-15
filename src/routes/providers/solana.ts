import { config } from '../../config'
import express from 'express'
import { getTokenSession } from '../../library/jwt'
import nacl from 'tweetnacl'
import { TextEncoder } from 'node:util'

const router = express.Router()

if (config.providers.anchor) {
  router.post('/provider/phantom', async (req, res, next) => {
    try {
      // TODO: fix me validate body
      const { address, signature, message, public_key } = req.body
      const encoder = new TextEncoder().encode
      const is_valid_signature = nacl.sign.detached.verify(
        encoder(message),
        encoder(signature),
        encoder(public_key),
      )
      console.log('auth response is_signature', is_valid_signature)
      if (!is_valid_signature)
        return res.status(401).send({ token: null, error: 'Invalid Signature' }) // TODO: fix me normalize error

      const token = await getTokenSession({
        address,
        username: 'solana', // TODO fix me
        auth_method: 'web3_solana',
        public_key: public_key,
      })
      return res.send({
        token: token,
        error: null,
      })
    } catch (error) {
      console.log({ error })
      return res.status(401).send({ token: null, error: error.message }) // TODO: fix me normalize error
    }
  })
}

export default router
