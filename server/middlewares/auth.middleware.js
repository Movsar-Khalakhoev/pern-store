const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({message: 'Пользователь не авторизован!'})
    }

    const isCorrectToken = jwt.verify(token, config.SECRET_KEY)

    if (!isCorrectToken) {
      return res.status(403).json({message: 'Некорретный access-токен!'})
    }

    req.user = isCorrectToken
    next()

  } catch (e) {
    res.status(401).json({message: 'Пользователь не авторизован!'})
  }
}
