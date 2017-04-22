var express = require('express');
var router = express.Router();
var controller = require('../controller/customer');

/* GET home page. */
router.post('/', function(req, res, next) {
    req.source = {
        body: [{
            name : "customerid",
            isRequired : true
        }],
        query: [],
        params: []
      };
      next();
    },
    controller.ride
);

module.exports = router;
