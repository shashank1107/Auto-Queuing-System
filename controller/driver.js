
var dbConnection = require('../services/dbConnect');
var store = require('../services/dbStore').sqlStore;

/**
 *  Get ride function
 *  @param {object}  req - request object.
 *  @param {object}  res - response object.
 *  @return {object}
 */

var controller = {};
controller.selectride = function (req, res, next) {
  console.log('In selectride function !!');
  var response;

  req.checkParams("requestid", "Invalid value").notEmpty();
  req.checkBody("driverid", "Invalid value").notEmpty();
  var errors = req.validationErrors(true);
  if (errors) {
      response = store.getResponse(400);
      response.error = errors;
      return res.status(400).send(response);
  }

  var driverid = req.body.driverid;
  var requestid = req.params.requestid;

  var qdriver_flag, qcheck_request;

  qdriver_flag = "Select driver_flag FROM `driver` WHERE driver_id =" + driverid;
  dbConnection.dbConnect(qdriver_flag)
  .then(function(result1){
      if(result1.driver_flag === 1){
          response = store.getResponse(403);
          response.error = "Not allowed to take ride";
          return res.status(403).send(response);
      }

      qcheck_request = "select driver_id from `dashboard` where request_id=" +  requestid;
      dbConnection.dbConnect(qcheck_request)
      .then(function(result2){
          if(result2.driver_id > 0){
              response = store.getResponse(403);
              response.error = "Ride has already been taken";
              return res.status(403).send(response);
          }
          else {
              var current_time = new Date().getTime();
              var qupdate_ride1 = "UPDATE `dashboard` set request_status = 1, driver_id = " + driverid  + " accepted_time = " + current_time  + " where request_id=" + requestid ;
              var qupdate_ride2 = "UPDATE `driver` set driver_flag = 1 where driver_id= " + driverid;
              dbConnection.dbConnect(qupdate_ride1)
              .then(function(result3){
                  dbConnection.dbConnect(qupdate_ride2)
                  .then(function(result4){
                      console.log('Successfully updated in ride function !!');
                      var response = store.getResponse(200);
                      response.data = result4;
                      return res.status(200).json(response);
                  })
                  .catch(function(error){
                      console.log('error getting ', error);
                      response = store.getResponse(500);
                      response.error = "Server Error";
                      return res.status(500).send(response);
                  });
              })
              .catch(function(error){
                  console.log('error getting ', error);
                  response = store.getResponse(500);
                  response.error = "Server Error";
                  return res.status(500).send(response);
              });
          }
      })
      .catch(function(error){
        console.log('error getting ', error);
          response = store.getResponse(500);
          response.error = "Server Error";
          return res.status(500).send(response);
      });
  })
  .catch(function(error){
      console.log('error getting ', error);
      response = store.getResponse(500);
      response.error = "Server Error";
      return res.status(500).send(response);
  });
};

controller.getList = function (req, res, next) {
  console.log('In getList function !!');
  var response;

  req.checkBody("driverid", "Invalid value").notEmpty();
  var errors = req.validationErrors(true);
  if (errors) {
      response = store.getResponse(400);
      response.error = errors;
      return res.status(400).send(response);
  }

  var driver_id = req.body.driverid;
  var query_string = "SELECT * from `dashboard` where driver_id =" + driver_id;
  dbConnection.dbConnect(query_string)
  .then(function(result){
      var response = store.getResponse(200);
      response.data = result;
      return res.status(200).json(response);
  })
  .catch(function(error){
      console.log('error getting ', error);
      response = store.getResponse(500);
      response.error = "Server Error";
      return res.status(500).send(response);
  });
};

module.exports = controller;
