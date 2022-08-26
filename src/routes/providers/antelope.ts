import express from 'express'
import * as eosio from '@greymass/eosio'
import { getTokenSession } from '../../library/jwt'

const router = express.Router()

router.post('/provider/antelope', async (req, res) => {
  try {
    const {
      // account is user_address for eosio.
      address,
      // signature made from the trnx generated after identifying
      signed_message,
      // digested transaction from the trnx generated after identifying
      message,
      eos_pub_key:  pub_key,
      auth_method,
      network
    } = req.body
    const eos_signature = eosio.Signature.from(signed_message)
    const eos_pub_key = eosio.PublicKey.from(pub_key)
    const is_valid_signature = eos_signature.verifyDigest(message, eos_pub_key)

    if (!is_valid_signature)
      return res.status(401).send({ token: null, error: 'Invalid Signature' }) // TODO: fix me normalize error

    const token = await getTokenSession({
      login_address: address,
      login_network: network,
      login_method: auth_method,
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
