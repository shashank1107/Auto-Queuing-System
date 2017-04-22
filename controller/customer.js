
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

  var response;
  req.checkBody('customerid', 'Invalid value').notEmpty().isString();
  var errors = req.validationErrors(true);
  if (errors) {
      response = store.getResponse(400);
      response.error = error.response.body;
      return res.status(400).send(response);
  }

  var customer_id = req.body.customerid;
  var date = new Date();
  var query_string = "INSERT INTO `request` (`request_id`, `customer_id`, `requset_time`) VALUES(NULL, '" + customer_id + "', '"+ date +"')";
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

module.exports = controller;
