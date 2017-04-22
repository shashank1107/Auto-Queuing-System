
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
  var driverid = req.body.driverid;
  var requestid = req.params.requestid;

  var query_string = "Select driver_flag FROM driver WHERE driver_id = " + driverid;
  dbConnection.dbConnect(query_string)
  .then(function(result){
      if(result.driver_flag === 1){
          response = store.getResponse(403);
          response.error = "Not allowed to take ride";
          return res.status(403).send(response);
      }

      var query_string1 = "SELECT if(COUNT(*)>0,'VALID','NOT_VALID') as Request FROM dashboard WHERE request_id = " +  requestid;
      dbConnection.dbConnect(query_string1)
      .then(function(result1){
          if(result1.Request == "VALID"){
              response = store.getResponse(403);
              response.error = "Ride has already been taken";
              return res.status(403).send(response);
          }
          else {
              var date = new Date();
              var start_time = date.getSeconds();
              var query_string2 = "INSERT INTO dashboard (request_id, driver_id, request_status,start_time) VALUES("+requestid+", "+ driverid+", 1,"+start_time +")";
              dbConnection.dbConnect(query_string2)
              .then(function(result2){
                var query_string3 = "UPDATE driver SET driver_flag = 1 WHERE driver_id = '" + driverid + "'";
                dbConnection.dbConnect(query_string2)
                  .then(function(result3){
                      var response = store.getResponse(200);
                      response.data = result3;
                      response.message = "Ride taken successfully";
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

  var response;
  var driverid = req.body.driverid;
  var date = new Date();
  var query_string = "UPDATE dashboard set request_status=2 where request_status=1 and (" + date + " - start_time) > 300  and driver_id =" + driverid;
  dbConnection.dbConnect(query_string)
  .then(function(result){
    var date = new Date();
    var query_string1 = "UPDATE driver set driver_flag = (SELECT if(COUNT(*)>0,0,1) as request_status FROM dashboard WHERE driver_id = "+ driverid +" and request_status=1) Where driver_id="+driverid;
    dbConnection.dbConnect(query_string1)
      .then(function(result1){
          var query_string2 = "SELECT * FROM dashboard INNER JOIN request ON dashboard.request_id = request.request_id WHERE dashboard.driver_id=" + driverid;
          dbConnection.dbConnect(query_string2)
            .then(function(result2){
                  var response = store.getResponse(200);
                  response.data = result2;
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
  })
  .catch(function(error){
      console.log('error getting ', error);
      response = store.getResponse(500);
      response.error = "Server Error";
      return res.status(500).send(response);
  });
};

module.exports = controller;
