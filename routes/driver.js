var express = require('express');
var router = express.Router();
var controller = require('../controller/driver');

var router = express.Router();
router.post('/select/:requestid',
    controller.selectride
);

router.post('/list',
    controller.getList
);

module.exports = router;
