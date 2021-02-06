const {DeviceType} = require('../models')
const ApiError = require('../error/ApiError')

const create = async (req, res, next) => {
  try {
    const {name} = req.body
    const newDeviceType = await DeviceType.create({name})

    return res.json({newDeviceType})
  } catch (e) {
    next(ApiError.internal(e))
  }
}

const getAll = async (req, res, next) => {
  try {
    const allDeviceTypes = await DeviceType.findAll()

    return res.json(allDeviceTypes)
  } catch (e) {
    next(ApiError.internal(e))
  }
}

module.exports = {
  create,
  getAll
}
