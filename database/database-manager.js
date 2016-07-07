"use strict";
var Pool=require("pg").Pool	//Pool is how we connect with the database.

process.on("unhandledRejection", function(e){
	console.log(e.message, e.stack);
});

module.exports= (function() {

	var config={
		host:"localhost",
		user:"postgres",
		password:"Tristan2014",//create another user account using PGAdmin
		database:"postgres"
	};

	var pool=new Pool(config);
	
	var saveProfile= function(username,email){
		pool.query(
			"INSERT INTO profile"+
			"(username,email)"+
			"VALUE($1, $2);", [username,email], function(error, result){//$1 etc is a place holder for the parameters- DON'T USE STRING CACOTONATION
				if(error){
					return console.error(error);
				}
				console.log(result);// once it's done inserting the info, what do you want it to do?

			}
			)

	}

	return {
		saveProfile: saveProfile,
		otherFunction: otherFunction


	}

})();//this is an immediately invoked function 

//node postgres is our ORM that allows us to communicate from the server to the database 
// Somewhere else var databaseManager=require("./database-manager.js");

"use strict";
var Pool = require("pg").Pool;
process.on("unhandledRejection", function(e) {
  console.log(e.message, e.stack);
});
module.exports = (function() {
  var config = {
    host: "localhost",
    user: "serverUser",
    password: "Password1",
    database: "postgres"
  };
  var pool = new Pool(config);
  var saveProfile = function(username, email) {
    pool.query(
      "INSERT INTO profile" +
      "(username, email)" +
      "VALUES ($1, $2);", [username, email], function(error, result) {
          if (error) {
            return console.error(error);
          }
          console.log(result);
      }
    );
  }
  return {
    saveProfile: saveProfile,
    otherFunction: otherFunction
  };
})();
//Somewhere else
var databaseManager = require("./database-manager.js");
databaseManager.saveProfile(...);