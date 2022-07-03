import express from 'express'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import routes from './routes'
import { config } from './config'
const app = express()
const port = config.port

import { TwitterProvider } from './routes/signin/providers/twitter'
TwitterProvider()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(require('express-session')({ secret: config.server_secret, resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(routes)

app.listen(port, () => {
  console.log(`Auth listening on port ${port}`)
})
