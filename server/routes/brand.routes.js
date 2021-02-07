const { getAll, create } = require('../controllers/brand.controllers')
const auth = require('../middlewares/auth.middleware')
const roles = require('../middlewares/role.middleware')
const { Router } = require('express')
const router = Router()

router.get('/', getAll)
router.post('/', auth, roles('Admin'), create)

module.exports = router
