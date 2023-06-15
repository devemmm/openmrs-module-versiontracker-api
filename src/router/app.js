const express = require('express')
const router = express.Router()
const Controller = require('../controller/app')

router.post('/module/api/signin', new Controller().signin)

router.post('/module/api/signup', new Controller().signup)

router.get('/module/api/facilities', new Controller().facilityInfo)

router.get('/module/api/facilities/:id', new Controller().facilityInfo)

router.post('/module/api/register/facility', new Controller().registerFacility)

router.post('/module/api/user/addupdatemodule', new Controller().addUpdateModule)




module.exports = router