
var dbConnection = require('../services/dbConnect');

/**
 *  Get ride function
 *  @param {object}  req - request object.
 *  @param {object}  res - response object.
 *  @return {object}
 */

var controller = {};
controller.selectride = function (req, res, next) {

  var response;
  req.checkBody('requestid', 'Invalid value').notEmpty().isString();
  req.checkBody('driverid', 'Invalid value').notEmpty().isString();

  var errors = req.validationErrors(true);
  if (errors) {
      response = store.getResponse(400);
      response.error = error.response.body;
      return res.status(400).send(response);
  }

  // var customer_id = req.body.customerid;
  // var date = new Date();
  // var query_string = "INSERT INTO `request` (`request_id`, `customer_id`, `requset_time`) VALUES(NULL, '" + customer_id + "', '"+ date +"')";
  dbConnection.dbConnect(query_string)
  .then(function(result){
    return res.status(200).json({
         "result" : result
    });
  })
  .catch(function(error){
    console.log('error getting ', error);
    return res.status(404).json({
          "error": error
      });
  });
};

var controller = {};
controller.getList = function (req, res, next) {

  var response;
  req.checkBody('driverid', 'Invalid value').notEmpty().isString();

  var errors = req.validationErrors(true);
  if (errors) {
      response = store.getResponse(400);
      response.error = error.response.body;
      return res.status(400).send(response);
  }

  // var customer_id = req.body.customerid;
  // var date = new Date();
  // var query_string = "INSERT INTO `request` (`request_id`, `customer_id`, `requset_time`) VALUES(NULL, '" + customer_id + "', '"+ date +"')";
  dbConnection.dbConnect(query_string)
  .then(function(result){
    return res.status(200).json({
         "result" : result
    });
  })
  .catch(function(error){
    console.log('error getting ', error);
    return res.status(404).json({
          "error": error
      });
  });
};

module.exports = controller;
