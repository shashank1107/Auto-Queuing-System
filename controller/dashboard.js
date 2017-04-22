
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

  var query_string = "SELECT * FROM dashboard INNER JOIN request ON dashboard.request_id = request.request_id LIMIT 10";
  dbConnection.dbConnect(query_string)
  .then(function(result){
      var response = store.getResponse(200);
      response.data = result;
      return res.status(200).json(response);
  })
  .catch(function(error){
      console.log('error getting ', error);
      console.log('error getting ', error);
      var response = store.getResponse(500);
      response.error = error.response.body;
      return res.status(500).send(response);
  });
};

module.exports = controller;
