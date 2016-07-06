import express from 'express'
// import mysql from '../db/connections/mysql'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('pages/index')
})

export default router
