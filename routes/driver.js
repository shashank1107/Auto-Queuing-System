var express = require('express');
var request = require('request');
var rp = require('request-promise');
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

router.get('/', function(req, res){
  console.log(req.query.id);
  var options = {
       uri: 'http://localhost:3000/api/api/driver/list',
       method: 'POST',
       body: {
         "driverid": req.query.id
       },
       json: true
   };

   rp(options)
    .then(function (response) {
      console.log(response);
      result = response;
      res.render('pages/driver', {
        result: result.data,
        driver_id: req.query.id
      });
    })
    .catch(function(err){
      console.log(err);
      res.render('pages/driver', {
        error: err,
        driver_id: req.query.id
      });
    });
});

module.exports = router;
