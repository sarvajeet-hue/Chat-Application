const express = require('express')
const { registerController } = require('../controller/RegisterController')
const { loginController } = require('../controller/LoginController')
const router = express.Router()

router.post('/register' , registerController)
router.post('/login' , loginController)

module.exports = {router}