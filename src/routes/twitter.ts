import { config } from '../config'
import { getNewOrUpdateCurrentSession } from '../library'

const express = require('express')
const passport = require('passport')
const db = {} // TODO: use prisma hasura etc

const router = express.Router()

if (config.providers.twitter) {
  router.get('/login/federated/twitter', passport.authenticate('twitter'))
  router.get(
    config.providers.twitter.callback,
    passport.authenticate('twitter', { assignProperty: 'federatedUser', failureRedirect: '/login/federated/twitter' }),
    async (req, res, next) => {
      req.login(req.federatedUser, async (err) => {
        if (err) {
          return next(err)
        }
        const sesion = await getNewOrUpdateCurrentSession({ user: req.federatedUser })
        res.send(sesion)
      })
    },
  )
  router.get('/logout', function (req, res, next) {
    req.logout()
    res.redirect('/')
  })
}

export default router
