import express from 'express'
// import _ from 'lodash'

import { mysql } from '../db/connections'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    let db = await Promise.resolve(mysql())
    let Post = db.models.post
    let posts = await Post.findAll()
    res.render('posts/index', {posts})
  } catch (err) {
    next(err)
  }
})

router.get('/create', (req, res, next) => {
  res.render('posts/create')
})

router.post('/create', async (req, res, next) => {
  try {
    req.session.form = req.body
    let db = await Promise.resolve(mysql())
    let Post = db.models.post
    await Post.create(req.body)
    req.flash('toastr', {
      'success': req.__('flash post %s created', req.body.title)
    })
    res.redirect(`/${req.getLocale()}/posts`)
  } catch (err) {
    res.view = 'posts/create'
    next(err)
  }
})

router.all('/:postId', async (req, res, next) => {
  try {
    let db = await Promise.resolve(mysql())
    let Post = db.models.post
    let post = await Post.findById(req.params.postId)
    if (post === null) {
      let err = new Error('Post not found')
      err.status = 404
      return next(err)
    }
    req.post = post
    next()
  } catch (err) {
    next(err)
  }
})

router.all('/:postId/edit', async (req, res, next) => {
  try {
    let db = await Promise.resolve(mysql())
    let Post = db.models.post
    let post = await Post.findById(req.params.postId)
    if (post === null) {
      let err = new Error('Post not found')
      err.status = 404
      return next(err)
    }
    req.post = post
    req.Post = Post
    next()
  } catch (err) {
    next(err)
  }
})

router.get('/:postId/edit', async (req, res, next) => {
  try {
    req.session.form = req.post
    res.render('posts/edit', {post: req.post, locals: req.locals})
  } catch (err) {
    next(err)
  }
})

router.put('/:postId/edit', async (req, res, next) => {
  try {
    req.session.form = req.body
    await req.post.update(req.body)
    req.flash('toastr', {
      'success': req.__('flash post %s updated', req.body.title)
    })
    res.redirect('/' + req.getLocale() + '/posts')
  } catch (err) {
    let post = await req.Post.findById(req.params.postId)
    res.view = 'posts/edit'
    res.ctx = {post}
    next(err)
  }
})

router.get('/:postId', async (req, res, next) => {
  try {
    let post = req.post
    res.render('posts/show', {post})
  } catch (err) {
    next(err)
  }
})

router.delete('/:postId', async (req, res, next) => {
  try {
    await req.post.destroy()
    if (req.xhr) {
      req.flash('toastr', {
        'success': req.__('flash post %s deleted', req.post.title)
      })
      return res.status(200).json({
        message: `Post ${req.post.title} deleted.`,
        redirectTo: `/${req.getLocale()}/posts`
      })
    }
    req.flash('toastr', {
      'success': req.__('flash post %s deleted', req.post.title)
    })
    res.redirect(`/${req.getLocale()}/posts`)
  } catch (err) {
    next(err)
  }
})

export default router
