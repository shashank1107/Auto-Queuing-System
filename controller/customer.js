
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
  req.checkBody("customerid", "Invalid value").notEmpty();
  var errors = req.validationErrors(true);
  if (errors) {
      response = store.getResponse(400);
      response.error = errors;
      return res.status(400).send(response);
  }

  var customer_id = req.body.customerid;
  var created_time = new Date().getTime();
  var query_string = "INSERT INTO `dashboard` (`customer_id`, `created_time`) VALUES(" + customer_id + ", '"+ created_time +"')";
  dbConnection.dbConnect(query_string)
  .then(function(result){
      console.log('getting data successfully in ride function ');
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
