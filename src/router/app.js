const express = require('express')
const router = express.Router()
const Controller = require('../controller/app')

router.post('/user/signin', new Controller().signin)

router.post('/user/signup', new Controller().signup)

router.get('/facilities', new Controller().facilityInfo)

router.get('/facilities/:id', new Controller().facilityInfo)

router.post('/user/register/facility', new Controller().registerFacility)

router.post('/user/addupdatemodule', new Controller().addUpdateModule)




module.exports = router