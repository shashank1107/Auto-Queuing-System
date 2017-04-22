
var express = require('express');
var router = express.Router();
//var pg = require('pg');
var mySQLPromise = require("promise-mysql");
// var mySQLPromise = new MySQLPromise();
// var mysql = require("mysql");


/**
 * [Internal modules]
 */

var conVars = {
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: '',
   database: process.env.DB_NAME
 };

var exports = module.exports = {};


exports.dbConnect = function(query_string){
	return new Promise(function(resolve, reject){
    var cnn;
    mySQLPromise.createConnection(conVars)
    .then(function(connection){
        cnn = connection;
        return cnn.query(query_string);
    })
    .then(function(result){
        // cnn.done();
				resolve(result);
    })
		.catch(function(error){
			console.log('error getting ', error);
			if(cnn){
				// cnn.done();
			}
			reject(error);
		});
	});
};
