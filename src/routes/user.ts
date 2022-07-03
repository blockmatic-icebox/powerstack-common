import * as express from 'express'
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn

const router = express.Router()

router.get('/', ensureLoggedIn(), function (req, res, next) {
  res.send(JSON.stringify({ user: req.user }))
})

export default router
