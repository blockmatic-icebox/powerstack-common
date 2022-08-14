import { config } from '../../config'
import express from 'express'
import { getTokenSession } from '../../library/jwt'
import { ethers } from 'ethers'

const router = express.Router()

router.post('/provider/evm', async (req, res, next) => {
  try {
    console.log('/provider/evm')

    const { address: user_address, signed_message, message, auth_method } = req.body
    // TODO: improve validation
    if (auth_method !== 'web3_metamask' || auth_method !== 'web3_auth')
      return res.status(401).send({ token: null, error: 'Invalid login method' }) // TODO: fix me normalize error

    const address_message = ethers.utils.verifyMessage(message, signed_message)

    if (address_message !== user_address)
      return res.status(401).send({ token: null, error: 'Invalid Signature' }) // TODO: fix me normalize error

    const token = await getTokenSession({
      username: 'anon', // TODO: fix me
      address: user_address,
      auth_method,
    })
    return res.send({
      token: token,
      error: null,
    })
  } catch (error) {
    return res.status(401).send({ token: null, error: error.message }) // TODO: fix me normalize error
  }
})

export default router
