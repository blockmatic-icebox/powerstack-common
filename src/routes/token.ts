import express from 'express'
import { verifyToken } from '../library/jwt'

const router = express.Router()

router.post('/token/verify', (req, res) => {
  const token = req.body.token
  // TODO: fix verify method in order to DEBUG we can use decodeJwt
  const decoded_token = verifyToken(token)
  // const decoded_token = decodeJwt(token);
  return res.send({ decoded_token })
})

export default router
