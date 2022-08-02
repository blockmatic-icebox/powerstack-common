import { config } from '../../config';
import express from 'express';
import axios from 'axios';
import { getSessionToken } from './../../library';
import * as eosio from '@greymass/eosio';

const router = express.Router();

if (config.providers.anchor) {
  router.post('/provider/anchor', (req, res, next) => {
    (async () => {
      try {
        const { signature, digest, pub_key } = req.body;
        const eos_signature = eosio.Signature.from(signature);
        const eos_pub_key = eosio.PublicKey.from(pub_key);
        const is_valid_signature = eos_signature.verifyDigest(digest, eos_pub_key);
        if (!is_valid_signature)
          return res.send({
            token: null,
          });
        const token = await getSessionToken({
          user: {
            account: pub_key,
          },
        });
        return res.send({
          token,
        });
      } catch (error) {
        res.send({
          token: null,
        });
      }
    })().catch(next);
  });
}

export default router;
