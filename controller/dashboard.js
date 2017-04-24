
var dbConnection = require('../services/dbConnect');
var store = require('../services/dbStore').sqlStore;

/**
 *  Get ride function
 *  @param {object}  req - request object.
 *  @param {object}  res - response object.
 *  @return {object}
 */

var controller = {};
controller.allRequests = function (req, res, next) {
  console.log('In allRequests function !!');

  var query_string = "SELECT * FROM `dashboard`";
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

controller.refresh = function (req, res, next) {
  console.log('In refresh function !!');

  var qupdate;
  var current_time = new Date().getTime();
  qupdate = "BEGIN; UPDATE dashboard set request_status=2 where request_status=1 and (" + current_time + " - accepted_time) > 300000; UPDATE driver set driver_flag = 0 where driver_id=(SELECT driver_id FROM dashboard WHERE request_status=2); COMMIT;";
  dbConnection.dbConnect(qupdate)
  .then(function(result){
      console.log('successfully updated');
      next();
  })
  .catch(function(error){
      console.log('error getting ', error);
      var response = store.getResponse(500);
      response.error = error.response.body;
      return res.status(500).send(response);
  });
};

module.exports = controller;
