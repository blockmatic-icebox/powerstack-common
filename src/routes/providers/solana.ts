import { config } from '../../config'
import express from 'express'
import { getSessionToken } from '../../library/jwt'

const router = express.Router()

if (config.providers.anchor) {
  router.post('/provider/anchor', async (req, res, next) => {
    try {
      const { address, signed_message } = req.body

      const is_valid_signature = false
      if (!is_valid_signature) return res.send({ token: null })
      const token = await getSessionToken({ address, username: '' })
      return res.send({ token })
    } catch (error) {
      res.send({ token: null })
    }
  })
}

export default router
