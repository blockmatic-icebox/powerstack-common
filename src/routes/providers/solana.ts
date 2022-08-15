import { config } from '../../config'
import express from 'express'
import { getTokenSession } from '../../library/jwt'
import nacl from 'tweetnacl'
import { TextEncoder } from 'node:util'
import bs58 from 'bs58'

const router = express.Router()

router.post('/provider/phantom', async (req, res, next) => {
  try {
    console.log('/provider/phantom')
    // TODO: fix me validate body
    const { address, signed_message, message } = req.body
    const is_valid_signed_message = nacl.sign.detached.verify(
      new TextEncoder().encode(message),
      bs58.decode(signed_message),
      bs58.decode(address),
    )
    if (!is_valid_signed_message)
      return res.status(401).send({ token: null, error: 'Invalid signed_message' }) // TODO: fix me normalize error

    const token = await getTokenSession({
      address,
      username: 'solana', // TODO fix me
      auth_method: 'web3_solana',
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

export default router
