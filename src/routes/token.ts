import { config } from '../config'
import express from 'express'
import { verifyToken } from './../library'

const router = express.Router()

router.post('/token/verify', (req, res, next) => {
  ;(async () => {
    const token = req.body.token
    const decoded_token = verifyToken(token)
    return res.send({ decoded_token })
  })().catch(next)
})

export default router
