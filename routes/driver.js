var express = require('express');
var router = express.Router();
var controller = require('../controller/driver');
var controller_dashboard = require('../controller/dashboard');

router.post('/select/:requestid',
    controller_dashboard.refresh,
    controller.selectride
);

router.post('/list',
    controller_dashboard.refresh,
    controller.getList
);

module.exports = router;
