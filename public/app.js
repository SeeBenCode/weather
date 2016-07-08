"use strict";

//var databaseManager = require("./database-manager.js");
//databaseManager.saveProfile(...);

function getLocationFromFacebook(callback){
    FB.api("/me?fields=location", function(response) {
        var cityState= response.location.name;
        console.log(response.location.name);
        if(response && !response.error){
        }
    });
    callback(cityState)
}

function partiallyApplyGetLLFromCity(){
    return function(){
        getWeather(locationName);
    }
}


function getLatLongFromCity(locationName){
    console.log(locationName);
    var url = "http://maps.googleapis.com/maps/api/geocode/xml?address="+locationName+"&sensor=false";

    $.getJSON(url, function(results){
        var latitude=results.results[0].geometry.location.lat;
        var longitude=results.results[0].geometry.location.lng;
        console.log(latitude);
        callback(latitude,longitude,callback)
        });
    console.log(latitude);
}

function getLocationFromIP(callback){
	var url = "http://ip-api.com/json";
	$.getJSON(url, function(data){
		callback(data.lat,data.lon);
	});
}

function getLocationFromZip(callback){
    var zip=document.getElementById("zip").value
    console.log(zip);
    var url = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+zip+"&key=AIzaSyAPap3f9CMf1Ad6Umm9LisnDJ_8dGj0jVU";
    $.getJSON(url, function(results){
        var latitude=results.results[0].geometry.location.lat;
        var longitude=results.results[0].geometry.location.lng;
        console.log(latitude);
        callback(latitude,longitude,callback)
        });
}


function getWeather(latitude,longitude,callback){
    var highTemperatures=[];
    var lowTemperatures=[];
	$.getJSON ("/weather?latitude="+latitude+"&longitude="+longitude,function(data){
        console.log(latitude);
    for(var i=0; i<5; i++){
        highTemperatures.push(data.daily.data[i].apparentTemperatureMax); 
    }
    for(var i=0; i<5; i++){
        lowTemperatures.push(data.daily.data[i].apparentTemperatureMin); 
    }

     callback(highTemperatures,lowTemperatures);

	});
}

function partiallyApplyGetWeather(callback){
    return function(latitude,longitude){
        getWeather(latitude,longitude,callback);

    }
}


function makeForecastTable(highTemperatures,lowTemperatures){
	var forecastHTML="<table class='table table-striped'>";
   	forecastHTML+="<th>Day</th><th>High</th><th>Low</th>";
    for(var i=0; i<5; i++){
       forecastHTML+="<tr><td> Day"+(i+1)+"</td><td>"+ highTemperatures[i] +"</td><td>"+lowTemperatures[i]+"</td></tr>"; 
    }
    forecastHTML+="</table>";

    var findIdForForecast=document.getElementById("forecast");
    findIdForForecast.innerHTML=forecastHTML;
}

/*

How to use the arrow function and bind-- go back and look this up!
this.function=function(callback){
    return function(lat, long)=>{
    this.blah(lat,lng,callback);
    }
}

this.function=function(callback){
    return function(lat, long){
    this.blah(lat,lng,callback);
    }.bind("this")
}


whatever comes after that has a this

*/