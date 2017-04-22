var express = require('express');
var router = express.Router();
var controller = require('../controller/customer');
var expressValidator = require('express-validator');

var router = express.Router();
router.use(expressValidator());

/* GET home page. */
router.post('/', function(req, res){
      // req.checkBody("customerid", "Invalid value").notEmpty().isString();
      // var errors = req.validationErrors(true);
      // if (errors) {
      //     response = store.getResponse(400);
      //     response.error = error.response.body;
      //     return res.status(400).send(response);
      // }
      next()
  },
  controller.ride
);

module.exports = router;
