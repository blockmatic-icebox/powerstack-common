import express from 'express'
import { getTokenSession } from '../../library/jwt'
import { ethers } from 'ethers'

const router = express.Router()

router.post('/provider/evm', async (req, res, next) => {
  try {
    // keep this just for some time @rubenanbix
    console.log('/provider/evm', { body: req.body })
    const { address: user_address, signed_message, message, auth_method, network } = req.body
    if (auth_method !== 'web3_metamask' && auth_method !== 'web3_auth')
      return res.status(401).send({ token: null, error: 'Invalid login method' })

    const address_message = ethers.utils.verifyMessage(message, signed_message)

    if (address_message !== user_address)
      return res.status(401).send({ token: null, error: 'Invalid Signature' })

    const token = await getTokenSession({
      login_address: user_address,
      login_method: auth_method,
      login_network: network === 'homestead' ? 'ethereum' : network,
    })
    return res.send({
      token: token,
      error: null,
    })
  } catch (error) {
    console.log({ error })
    return res.status(401).send({ token: null, error: error.message })
  }
})

export default router
