const express = require('express')
const adminAuthenticator = require('../middleware/adminAuthenticator')
const { getInstructors, addCourse, getCoursesInstructors, addLecture } = require('../controllers/adminController')
const router = express.Router()

router.route('/instructor').get(adminAuthenticator,getInstructors)
router.route('/course').post(adminAuthenticator,addCourse)
router.route('/course').get(adminAuthenticator,getCoursesInstructors)
router.route('/lecture').post(adminAuthenticator,addLecture)

module.exports = router