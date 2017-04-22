
var dbConnection = require('../services/dbConnect');
var store = require('../services/dbStore').sqlStore;

/**
 *  Get ride function
 *  @param {object}  req - request object.
 *  @param {object}  res - response object.
 *  @return {object}
 */

var controller = {};

controller.ride = function (req, res, next) {

  console.log('In ride function !!');
  var response;

  var customer_id = req.body.customerid;
  var requestid = getRandomArbitrary(1, 10000);
  var date = new Date();
  var query_string = "INSERT INTO `request` (`request_id`, `customer_id`, `request_time`) VALUES(" + requestid + ", " + customer_id + ", '"+ date +"')";
  dbConnection.dbConnect(query_string)
  .then(function(result){
      var response = store.getResponse(200);
      response.data = result;
      return res.status(200).json(response);
  })
  .catch(function(error){
      console.log('error getting ', error);
      var response = store.getResponse(500);
      response.error = error.response.body;
      return res.status(500).send(response);
  });
};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = controller;
