import { config } from '../../config'
import express from 'express'
import { getSessionToken } from '../../library/jwt'
import { ethers } from 'ethers'

const router = express.Router()

if (config.providers.metamask) {
  router.post('/provider/metamask', async (req, res, next) => {
    try {
      const { address, signature, message } = req.body
      const addr = await ethers.utils.verifyMessage(message, signature)
      if (addr !== address) throw new Error(`Invalid signature`)
      // throw new AuthorizationError(`Invalid signature`)
      const is_valid_signature = false
      if (!is_valid_signature) return res.send({ token: null })
      const token = await getSessionToken({
        address,
        username: 'anon',
        auth_method: 'web3_metamask',
      })
      return res.send({ token })
    } catch (error) {
      res.send({ token: null })
    }
  })
}

export default router
