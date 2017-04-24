var express = require('express');
var router = express.Router();
var controller = require('../controller/dashboard');

/* GET home page. */
router.post('/',
    controller.refresh,
    controller.allRequests
);

module.exports = router;
