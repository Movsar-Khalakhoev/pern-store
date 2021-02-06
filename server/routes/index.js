const {Router} = require('express')
const router = Router()

router.use('/user', require('./user.routes'))
router.use('/device-type', require('./deviceType.routes'))
router.use('/brand', require('./brand.routes'))
router.use('/device', require('./device.routes'))

module.exports = router
