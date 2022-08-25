import * as express from 'express'
import { ReasonPhrases } from 'http-status-codes'
import twitter_router from './providers/twitter'
import antelope_router from './providers/antelope'
import evm_router from './providers/evm'
import evm_solana from './providers/solana'
import token_router from './token'

require('express-async-errors')

const router = express.Router()

router.get('/healthz', (_req, res) => res.send(ReasonPhrases.OK))
router.use('/', twitter_router)
router.use('/', token_router)
router.use('/', antelope_router)
router.use('/', evm_router)
router.use('/', evm_solana)

export default router
