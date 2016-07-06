import csurf from 'csurf'

import localeMdw from '../middleware/locale'
import pages from './pages'
import posts from './posts'

const csrfProtection = csurf({ cookie: true })

export default (app) => {
  app.use(csrfProtection)
  app.use(require('../middleware/csrf'))

  app.use('/', pages)
  app.use('/:locale(ru|en)/posts', localeMdw, posts)
}
