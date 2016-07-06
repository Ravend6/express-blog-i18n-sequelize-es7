import chalk from 'chalk'

if (process.env.NODE_ENV === 'development') {
  module.exports = (err, req, res, next) => {
    console.log(chalk.magenta(`${err.stack}`))
    res.status(err.status || 500)
    if (err.message === 'Cannot enqueue Query after fatal error.') {
      return res.send('I can not connect to database mysql.')
    }
    res.render('errors/error', {
      message: err.message,
      error: err
    })
  }
} else {
  module.exports = (err, req, res, next) => {
    res.status(err.status || 500)
    if (err.message === 'Cannot enqueue Query after fatal error.') {
      return res.send('Сайт временно не работает.')
    }
    res.render('errors/error', {
      message: err.message,
      error: {
        status: err.status
      }
    })
  }
}
