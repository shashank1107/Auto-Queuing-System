var express = require('express');
var router = express.Router();
var controller = require('../controller/driver');
var expressValidator = require('express-validator');

var router = express.Router();
router.use(expressValidator());

router.post('/select/:requestid',

  //   function(req, res){
  //
  //     req.checkParams("requestid", "Invalid value").notEmpty().isString();
  //     req.checkBody("driverid", "Invalid value").notEmpty().isString();
  //     var errors = req.validationErrors(true);
  //     if (errors) {
  //         response = store.getResponse(400);
  //         response.error = error.response.body;
  //         return res.status(400).send(response);
  //     }
  //     next()
  // },
    controller.selectride
);

router.post('/list',
  //   function(req, res){
  //     req.checkBody("driverid", "Invalid value").notEmpty().isString();
  //     var errors = req.validationErrors(true);
  //     if (errors) {
  //         response = store.getResponse(400);
  //         response.error = error.response.body;
  //         return res.status(400).send(response);
  //     }
  //     next()
  // },
    controller.getList
);

module.exports = router;
