const express = require('express')
const instructorAuthenticator = require('../middleware/instructorAuthenticator')
const { getSchedule } = require('../controllers/instructorController')
const router = express.Router()

router.route('/getSchedule').get(instructorAuthenticator,getSchedule)

module.exports = router