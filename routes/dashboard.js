var express = require('express');
var rp = require('request-promise');
var request = require('request');
var router = express.Router();
var controller = require('../controller/dashboard');

/* GET home page. */
router.post('/',
    controller.refresh,
    controller.allRequests
);

router.get('/', function(req, res){
  var options = {
       uri: 'http://localhost:3000/api/',
       method: 'POST',
       qs: {}
   };

   rp(options)
    .then(function (response) {
      console.log(JSON.parse(response));
      result = JSON.parse(response);
      res.render('pages/dashboard', {
        result: result.data
      });
    });
});

module.exports = router;
