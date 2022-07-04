import * as express from 'express';
import { ReasonPhrases } from 'http-status-codes';
import twitterRouter from './providers/twitter';

const router = express.Router();

router.get('/healthz', (req, res) => res.send(ReasonPhrases.OK));
router.use('/', twitterRouter);

export default router;
