const {registration, check, login} = require('../controllers/user.controllers')
const auth = require('../middlewares/auth.middleware')
const {Router} = require('express')
const router = Router()

router.get('/auth', auth, check)
router.post('/registration', registration)
router.post('/login', auth, login)

module.exports = router
