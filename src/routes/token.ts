import { config } from '../config';
import express from 'express';
import { verifyToken } from './../library';
import { decodeJwt } from 'jose';

const router = express.Router();

router.post('/token/verify', (req, res, next) => {
  (async () => {
    const token = req.body.token;
    // TODO: fix verify method
    // const decoded_token = verifyToken(token);
    const decoded_token = decodeJwt(token);
    return res.send({ decoded_token });
  })().catch(next);
});

export default router;
