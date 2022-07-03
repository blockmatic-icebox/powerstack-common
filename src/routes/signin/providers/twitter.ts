import passport from 'passport';
import Strategy from 'passport-twitter';
import { config } from '../../../config';

export const TwitterProvider = () => {
  passport.use(
    new Strategy(
      {
        consumerKey: config.providers.twitter.consumer_key,
        consumerSecret: config.providers.twitter.consumer_secret,
        callbackURL: config.providers.twitter.callback_url,
      },
      (token, tokenSecret, profile, cb) => {
        // TODO: save on db profile.id token tokenSecret
        console.log({ token, tokenSecret, profile });
        return cb(null, profile);
      }
    )
  );
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
