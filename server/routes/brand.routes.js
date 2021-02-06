const {getAll, create} = require('../controllers/brand.controllers')
const {Router} = require('express')
const router = Router()

router.get('/', getAll)
router.post('/', create)

module.exports = router
