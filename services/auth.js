const db = require('../model/db');
const crypto = require('crypto')

module.exports = {
  authorization: (login, cb) => {
    const user = db.get('user').value()

    if(!user) {
      return cb(new Error('не верный логин или пароль'))
    }

    crypto.pbkdf2(login.password, user.salt, 1000, 512, 'sha512', (err, hash) => {
      if(err) {
        return cb(new Error('Возникла ошибка сервера'))
      }

      cb(null, {
        email: user.email,
        password: hash.toString('hex') === user.hash
      })
    })
  },
  registration(login, cb) {
    const salt = crypto.randomBytes(16).toString('hex')

    crypto.pbkdf2(login.password, salt, 1000, 512, 'sha512', (err, hash) => {
      if(err) {
        return cb(new Error('Возникла ошибка при регистрации'))
      }

      db.set('user', {
        email: login.email,
        salt,
        hash: hash.toString('hex')
      }).write()

      cb(null, {
        message: 'Вы успешно зарегистрированы!'
      })
    })
  }
}
