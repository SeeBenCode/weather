var express=require("express");
var app=express();

//var pugOne=require("pug");
//var pugOne =pug();

//pugOne.set('view engine','pug')
//pugOne.set('views','./views')
//pugOne.locals.pretty= true

var databaseManager = require("./database/database-manager.js");


app.use(express.static("public"));
app.listen(3000,function(){
	console.log("listening on port",3000);
});

var https = require("https");//middleware- allows you to do https

function getJSON(url, callback) {// replacement $.getJSON
 https.get(url, (response) => {
   var body = '';
   response.on('data', function(d) {
       body += d;
   });
   response.on('end', function() {
     callback(null, JSON.parse(body));
   });
 }).on('error', function(e) {
   callback(e);
 });
}

//var url = "https://api.forecast.io/forecast/3b14fbcdc2580c3f452d00c396be6641/"+latitude+","+longitude;

app.get("/weather",function(request,response){
	var url = "https://api.forecast.io/forecast/3b14fbcdc2580c3f452d00c396be6641/"+request.query.latitude+","+request.query.longitude;	
    getJSON(url, function(error,data){
      databaseManager.saveLocationQuery(request.query.latitude,request.query.longitude,"07/11/2016", function(locationID){
        for (var i=0; i<5; i++){
          databaseManager.saveForecast(data.daily.data[i].summary,
          Math.round(data.daily.data[i].apparentTemperatureMax),
          Math.round(data.daily.data[i].apparentTemperatureMin),
          data.daily.data[i].precipProbability,
          locationID);
          }
      });
    response.send(JSON.stringify(data));  
    }); 

	})




