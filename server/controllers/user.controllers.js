const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models')
const config = require('../config')

const registration = async (req, res, next) => {
  const {email, password, role} = req.body
  if (!email || !password) {
    return next(ApiError.badRequest('Некорректный логин или пароль!'))
  }

  const candidate = await User.findOne({where: {email}})

  if (candidate) {
    return next(ApiError.badRequest('Пользователь с таким логином уже существует!'))
  }

  const hashedPassword = await bcrypt.hash(password, 5)
  const newUser = await User.create({email, role, password: hashedPassword})
  const newBasket = await Basket.create({userId: newUser.id})

  console.log(config.SECRET_KEY)
  const token = jwt.sign({id: newUser.id, email, role}, config.SECRET_KEY, {
    expiresIn: '24h'
  })

  return res.json({token})
}

const login = async (req, res, next) => {
  const {email, password} = req.body

  const candidate = await User.findOne({where: {email}})

  if (!candidate) {
    return next(ApiError.badRequest('Такой пользователь не найден!'))
  }

  const isCorrectPassword = bcrypt.compareSync(password, candidate.password)

  if (!isCorrectPassword) {
    return next(ApiError.badRequest('Неправильный пароль!'))
  }

  const token = generateAccessToken(candidate.id, candidate.email, candidate.role)

  res.json({token})
}

const check = (req, res, next) => {
  const token = generateAccessToken(req.user.id, req.user.email, req.user.role)
  res.json({token})
}

function generateAccessToken(id, email, role) {
  return jwt.sign({id, email, role}, config.SECRET_KEY, {
    expiresIn: '24h'
  })
}

module.exports = {
  registration,
  login,
  check
}
