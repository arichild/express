const express = require('express')
const router = express.Router()
const { products, skills } = require('../data.json')
const nodemailer = require('nodemailer')

router.get('/', (req, res, next) => {
  res.render('pages/index', { title: 'Main page', products, skills })
})

router.post('/', (req, res, next) => {
  let name = req.body.name
  let email = req.body.email
  let msg = req.body.message

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

  console.log(mailOption)

  transporter.sendMail(mailOption, function(err, info){
    if(err) {
      console.log(err)
    } else {
      console.log('email sent ' + info)
    }

    res.redirect('/')
  })
})

module.exports = router
