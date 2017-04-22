var express = require('express');
var router = express.Router();
var controller = require('../controller/customer');

/* GET home page. */
router.post('/',
    controller.allRequests
);

module.exports = router;
