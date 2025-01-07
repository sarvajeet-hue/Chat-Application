const express = require('express')
const { registerController } = require('../controller/RegisterController')
const router = express.Router()

router.post('/register' , registerController)

module.exports = {router}