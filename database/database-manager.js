"use strict";
//node postgres is our ORM that allows us to communicate from the server to the database 
var Pool = require("pg").Pool;//Pool is how we connect with the database.
process.on("unhandledRejection", function(e) {
  console.log(e.message, e.stack);
});

module.exports = (function() {
  var config = {
    host: "localhost",
    user: "weather_server",
    password: "weather1234",
    database: "postgres"
  };

var pool = new Pool(config);
  
var saveLocationQuery = function(latitude,longitude, date,callback) {
  pool.query(
    //format every query date to fit SQL timestamp format
    "INSERT INTO location_query" +
    "(latitude, longitude,query_date)" +
    "VALUES ($1, $2, $3)RETURNING id;"  , [latitude, longitude,date], function(error, result) {//$1 etc is a place holder for the parameters- DON'T USE STRING CACOTONATION
        if (error) {
          return console.error(error);
        }
        callback(result.rows[0].id);	
    }

  );
}

var saveForecast = function(summary,high_temp,low_temp,precip_chance,location_query_id) {
    pool.query(
      //format every query date to fit SQL timestamp format
      "INSERT INTO forecast" +
      "(summary,high_temp,low_temp,precip_chance,location_query_id)" +
      "VALUES ($1, $2, $3,$4,$5);", [summary,high_temp,low_temp,precip_chance,location_query_id], function(error, result) {//$1 etc is a place holder for the parameters- DON'T USE STRING CACOTONATION
          if (error) {
            return console.error(error);
          }
          //return "hello";  //once it's done inserting the info, what do you want it to do?
      }
    );
  }


var checkDatabase = function(latitude,longitude, query_date) {
pool.query(
  //Here you need to conver var day= query_date
  "SELECT * FROM location_query " +
  "WHERE latitude<$1+1 AND latitude>$1-1" +       //implement fuzz factor
  "AND longitude<$2+1 AND latitude>$2-1" +
  "AND EXTRACT(DAY FROM query_date)=$3;", [latitude, longitude,day], function(error, result) {//$1 etc is a place holder for the parameters- DON'T USE STRING CACOTONATION
      if (error) {
        return console.error(error);
      }
      console.log(result); 
  }
);
}

return {
  saveLocationQuery: saveLocationQuery,
  saveForecast: saveForecast,
  checkDatabase: checkDatabase
};
})();//this is an immediately invoked function expression



