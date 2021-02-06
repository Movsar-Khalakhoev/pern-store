const {getAll, create} = require('../controllers/deviceType.controllers')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/role.middleware')
const {Router} = require('express')
const router = Router()

router.get('/', auth, roles('ADMIN'), getAll)
router.post('/', auth, roles('ADMIN'), create)

module.exports = router
