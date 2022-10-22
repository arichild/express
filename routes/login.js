const express = require('express')
const router = express.Router()
const auth = require('../services/auth')

router.get('/', (req, res, next) => {
  if(req.session.auth) {
    res.redirect('/admin')
  }

  res.render('pages/login', {title: 'SigIn page', msglogin: req.flash('login')[0]})
})

router.post('/', (req, res, next) => {
  const login = {
    email: req.body.email,
    password: req.body.password
  }

  auth.authorization(login, (err, status) => {
    if(err) {
      req.flash('login', err.message)

      return res.redirect('/login')
    }

    if(status.password && login.email === status.email) {
      req.session.auth = true

      res.redirect('/admin')
    } else {
      req.flash('login', 'авторизация провалена')

      return res.redirect('/login')
    }
  })
})

module.exports = router
