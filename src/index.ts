import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import routes from './routes';
import { config } from './config';
const app = express();
const router = express.Router();
const port = config.port;

import { TwitterProvider } from './routes/signin/providers/twitter';
TwitterProvider();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(require('express-session')({ secret: config.server_secret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api', (req, res) => {
  res.send({
    api: listEndpoints(app),
    callback: config.providers.twitter,
  });
});

app.use(routes);

app.listen(port, () => {
  console.log(`Auth listening on port ${port}`);
});
