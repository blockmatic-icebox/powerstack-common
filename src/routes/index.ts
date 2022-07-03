import * as express from 'express'
import { ReasonPhrases } from 'http-status-codes'
import userRouter from './user'
import twitterRouter from './twitter'

const router = express.Router()

router.get('/healthz', (req, res) => res.send(ReasonPhrases.OK))
router.use('/', twitterRouter)
router.use('/', userRouter)

export default router
