import { config } from '../../config'
import express from 'express'
import { getTokenSession } from '../../library/jwt'
import { ethers } from 'ethers'

const router = express.Router()

router.post('/provider/evm', async (req, res, next) => {
  try {
    console.log('/provider/evm')
    const { address: user_address, signed_message, message } = req.body
    const address_message = await ethers.utils.verifyMessage(message, signed_message)

    if (address_message !== user_address)
      return res.status(401).send({ token: null, error: 'Invalid Signature' }) // TODO: fix me normalize error

    const token = await getTokenSession({
      username: 'anon', // TODO: fix me
      address: user_address,
      auth_method: 'web3_evm',
    })
    return res.send({
      token: token,
      error: null,
    })
  } catch (error) {
    res.send({ token: null, error })
  }
})

export default router
