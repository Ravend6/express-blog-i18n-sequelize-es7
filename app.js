import path from 'path'
import http from 'http'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import flash from 'connect-flash'
import MySQLStore from 'express-mysql-session'
import methodOverride from 'method-override'
import i18n from 'i18n'
// import favicon from 'serve-favicon'
// import compression from 'compression'

// import mysql from './db/connections/mysql'
import { mysql } from './db/connections'
import routes from './routes'

const app = express()
const debug = require('debug')('app:server')
const port = process.env.APP_PORT

i18n.configure({
  locales: ['en', 'ru'],
  directory: path.join(__dirname, '/locales')
})

i18n.setLocale(process.env.APP_LANGUAGE)

mysql()

const sessionStore = new (MySQLStore(session))({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

app.set('port', port)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  name: 'sid',
  secret: process.env.SECRET,
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
  // cookie: {
  //   secure: true,
  //   maxAge: 60000,
  // }
}))

app.use(flash())

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use(i18n.init)

app.use(require('./middleware/locals'))

routes(app)

app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(require('./middleware/sequelizeErrors'))
app.use(require('./middleware/errors'))

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

debug('NODE_ENV is ' + process.env.NODE_ENV)

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening () {
  var addr = this.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
