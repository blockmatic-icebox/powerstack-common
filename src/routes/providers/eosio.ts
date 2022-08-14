import { config } from '../../config'
import express from 'express'
import * as eosio from '@greymass/eosio'
import { getTokenSession } from '../../library/jwt'

const router = express.Router()

if (config.providers.anchor) {
  router.post('/provider/eosio', async (req, res) => {
    try {
      const { signature, digest, pub_key } = req.body
      const eos_signature = eosio.Signature.from(signature)
      const eos_pub_key = eosio.PublicKey.from(pub_key)
      const is_valid_signature = eos_signature.verifyDigest(digest, eos_pub_key)
      if (!is_valid_signature) return res.send({ token: null })
      const token = await getTokenSession({
        address: pub_key,
        username: 'anon',
        auth_method: 'web3_evm',
      })
      return res.send({ token })
    } catch (error) {
      res.send({ token: null })
    }
  })
}

export default router
