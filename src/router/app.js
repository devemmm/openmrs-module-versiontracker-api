const express = require('express')
const router = express.Router()
const Controller = require('../controller/app')

router.post('/signin', new Controller().signin)

router.post('/signup', new Controller().signup)

router.get('/facilities', new Controller().facilityInfo)

router.get('/facilities/:id', new Controller().facilityInfo)

router.post('/register/facility', new Controller().registerFacility)

router.post('/system/information', new Controller().updateSystemInformation)

module.exports = router