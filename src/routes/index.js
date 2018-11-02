'use strict'

const router = require('koa-router')()
const Controller = require('../controllers')

// router.get('/', Controller.FlowMomonitoring.func1);
router.get('/hello', Controller.FlowMomonitoring.sayHello);
router.get('/show', Controller.FlowMomonitoring.show);



module.exports = router