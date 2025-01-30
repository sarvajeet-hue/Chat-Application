const express = require('express')
const { registerController, getAllRegisteredUser } = require('../controller/RegisterController')
const { loginController } = require('../controller/LoginController')
const router = express.Router()

router.post('/register' , registerController)
router.post('/login' , loginController)

router.get('/allRegisteredUser' , getAllRegisteredUser)

module.exports = router