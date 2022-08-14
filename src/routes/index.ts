import * as express from 'express'
import { ReasonPhrases } from 'http-status-codes'
import twitterRouter from './providers/twitter'
import anchorRouter from './providers/eosio'
import evmRouter from './providers/evm'
import tokenRouter from './token'

require('express-async-errors')

const router = express.Router()

router.get('/healthz', (req, res) => res.send(ReasonPhrases.OK))
router.use('/', twitterRouter)
router.use('/', tokenRouter)
router.use('/', anchorRouter)
router.use('/', evmRouter)

export default router
