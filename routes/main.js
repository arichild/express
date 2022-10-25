const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json')
const nodemailer = require('nodemailer')

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills, msgemail: req.flash('form')[0]})
})

router.post('/', (req, res, next) => {
  let name = req.body.name
  let email = req.body.email
  let msg = req.body.message

  if(name !== '' && email !== '' && msg !== '') {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arieevq@gmail.com',
        pass: 'szyixzhhhbpkborl'
      }
    })

    let mailOption = {
      from: email,
      to: 'arieevq@gmail.com',
      subject: name,
      text: msg,
    }

    transporter.sendMail(mailOption, function(err, info) {
      if(err) {
        console.log(err)
      } else {
        console.log('email sent ' + info)
      }

      req.flash('form', 'Сообщение отправлено!');

      res.redirect('/#form')
    })
  } else {
    req.flash('form', 'Поля не могут быть пустыми');

    return res.redirect('/#form')
  }
})

module.exports = router
