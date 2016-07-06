import moment from 'moment'
import { capitalize } from '../lib/helpers'

module.exports = (req, res, next) => {
  res.locals.pretty = process.env.NODE_ENV === 'development'
  res.locals.app = {
    sitename: process.env.APP_SITENAME,
    session: req.session,
    toastr: req.flash('toastr'),
  }

  moment.locale(process.env.APP_LANGUAGE)

  // helpers
  res.locals.helpers = {
    capitalize,
    moment,
  }

  res.locals.formErrors = []
  delete req.session.form

  req.ajax = function () {
    return req.headers['x-requested-with'] === 'XMLHttpRequest'
  }

  next()
}
