import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import routes from './routes';
import { config } from './config';
const app = express();
const port = config.port;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
  })
);
app.use(
  require('express-session')({
    name: 'powerstack-auth',
    secret: config.server_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 30, // 30 seconds
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  console.log(listEndpoints(app));
  res.send({
    api: listEndpoints(app),
  });
});

app.use(routes);

app.listen(port, () => {
  console.log(`Auth listening on port ${port}`);
  console.log(listEndpoints(app));
});
