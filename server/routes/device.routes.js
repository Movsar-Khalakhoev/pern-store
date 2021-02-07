const { Router } = require('express')
const router = Router()
const { create, getAll, getOne } = require('../controllers/device.controllers')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/role.middleware')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', auth, roles('Admin'), create)

module.exports = router
