const {Router} = require('express')
const router = Router()
const {create, getAll, getOne} = require('../controllers/device.controllers')

router.get('/', getAll)
router.get('/:id', getOne)
router.post('/', create)

module.exports = router
