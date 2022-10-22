const express = require('express')
const fs = require('fs');
const router = express.Router()
const fileName = '../data.json';
const { products, skills } = require(fileName)
const path = require('path')
const formidable = require("formidable");

router.get('/', (req, res, next) => {
  if(!req.session.auth) {
    req.flash('login', 'Сессия истекла')

    return res.redirect('/login')
  }

  res.render('pages/admin', {
    title: 'Admin page',
    skills: skills,
  })
})

router.post('/skills', (req, res, next) => {
  let age = req.body.age;
  let concerts = req.body.concerts;
  let cities = req.body.cities;
  let years = req.body.years;

  skills[0].number = age;
  skills[1].number = concerts;
  skills[2].number = cities;
  skills[3].number = years;

  fs.writeFileSync('data.json', JSON.stringify({skills, products}, null, 2));

  res.redirect('/')
})

router.post('/upload', (req, res, next) => {
  let form = new formidable.IncomingForm()
  let upload = path.join('./public/assets/img', 'products')

  form.uploadDir = path.join(process.cwd(), upload)

  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err)
    }

    const fileName = path.join(upload, files.photo.originalFilename)

    fs.rename(files.photo.filepath, fileName, function (err) {
      if (err) {
        console.error(err.message)
        return
      }

      let dir = fileName.substr(fileName.indexOf('\\'))

      fields.src = dir

      products.push(fields)

      fs.writeFileSync('data.json', JSON.stringify({skills, products}, null, 2));

      res.redirect('/')
    })
  })
})

module.exports = router
