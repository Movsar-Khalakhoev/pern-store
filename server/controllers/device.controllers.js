const {Device, DeviceInfo} = require('../models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

const create = async (req, res, next) => {
  try {
    let {name, price, brandId, deviceTypeId, info} = req.body
    const {img} = req.files
    const fileName = `${uuid.v4()}.jpg`

    const newDevice = await Device.create({name, price, brandId, deviceTypeId, img: fileName})
    await img.mv(path.resolve(__dirname, '../static', fileName))

    if (info) {
      info = JSON.parse(info)
      info(i => DeviceInfo.create({
        title: i.title,
        description: i.description,
        deviceId: newDevice.id
      }))
    }

    return res.json(newDevice)
  } catch (e) {
    console.log(e)
    next(ApiError.internal(e))
  }
}

const getAll = async (req, res, next) => {
  try {
    let {brandId, deviceTypeId, limit, page} = req.query
    page = page || 1
    limit = limit || 9
    const offset = page * limit - limit
    let devices


    if (!brandId && !deviceTypeId) {
      devices = await Device.findAndCountAll({limit, offset})
    } else if (!brandId && deviceTypeId) {
      devices = await Device.findAndCountAll({where: {deviceTypeId}, limit, offset})
    } else if (brandId && !deviceTypeId) {
      devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
    } else if (brandId && deviceTypeId) {
      devices = await Device.findAndCountAll({where: {brandId, deviceTypeId}, limit, offset})
    }


    return res.json(devices)
  } catch (e) {
    next(ApiError.internal(e))
  }
}

const getOne = async (req, res, next) => {
  try {
    const {id} = req.params
    const device = await Device.findOne(
      {
        where: {id},
        include: [{model: DeviceInfo, as: 'info'}]
      }
      ) || {}

    return res.json(device)
  } catch (e) {
    next(ApiError.internal(e))
  }
}

module.exports = {
  create,
  getAll,
  getOne
}
