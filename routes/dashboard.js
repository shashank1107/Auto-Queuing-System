var express = require('express');
var router = express.Router();
var controller = require('../controller/dashboard');

var router = express.Router();
/* GET home page. */
router.post('/',
    controller.allRequests
);

module.exports = router;
