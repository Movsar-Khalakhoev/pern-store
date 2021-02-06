const {Brand} = require('../models')
const ApiError = require('../error/ApiError')

const create = async (req, res, next) => {
  try {
    const {name} = req.body
    const newBrand = await Brand.create({name})

    res.json(newBrand)
  } catch (e) {
    next(ApiError.internal(e))
  }
}

const getAll = async (req, res, next) => {
  try {
    const allBrands = await Brand.findAll()

    res.json(allBrands)
  } catch (e) {
    next(ApiError.internal(e))
  }
}

module.exports = {
  create,
  getAll
}
