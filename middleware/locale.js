import moment from 'moment'

export default (req, res, next) => {
  req.setLocale(req.params.locale)
  moment.locale(req.params.locale)

  next()
}
