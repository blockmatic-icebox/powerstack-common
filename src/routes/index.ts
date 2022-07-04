import * as express from 'express';
import { ReasonPhrases } from 'http-status-codes';
import twitterRouter from './providers/twitter';
import tokenRouter from './token';

const router = express.Router();

router.get('/healthz', (req, res) => res.send(ReasonPhrases.OK));
router.use('/', twitterRouter);
router.use('/', tokenRouter);

export default router;
