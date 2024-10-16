const express = require('express')
const { loginHandler } = require('../controllers/authController')
const router = express.Router()

router.route('/login').post(loginHandler)

module.exports = router