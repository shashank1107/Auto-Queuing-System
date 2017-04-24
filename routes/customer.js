var express = require('express');
var router = express.Router();
var controller = require('../controller/customer');

/* GET home page. */
router.post('/',
  controller.ride
);

router.get('/', function(req, res){
  res.render('pages/customerapp', {
    flag: 2
  });
});

module.exports = router;
