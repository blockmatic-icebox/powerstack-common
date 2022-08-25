import express from 'express'
import * as eosio from '@greymass/eosio'
import { getTokenSession } from '../../library/jwt'

const router = express.Router()

router.post('/provider/antelope', async (req, res) => {
  try {
    const { address: account, signed_message: signature, message: digest, pub_key } = req.body
    const eos_signature = eosio.Signature.from(signature)
    const eos_pub_key = eosio.PublicKey.from(pub_key)
    const is_valid_signature = eos_signature.verifyDigest(digest, eos_pub_key)

    if (!is_valid_signature)
      return res.status(401).send({ token: null, error: 'Invalid Signature' }) // TODO: fix me normalize error

    const token = await getTokenSession({
      login_address: pub_key,
      login_network: 'eos',
      login_method: 'web3_anchor',
    })
    return res.send({
      token: token,
      error: null,
    })
  } catch (error) {
    return res.status(401).send({ token: null, error: error.message })
  }
})

export default router
