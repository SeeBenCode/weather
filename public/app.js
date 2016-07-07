"use strict";

function getLocationFromIP(callback){
	var url = "http://ip-api.com/json";
	$.getJSON(url, function(data){
		callback(data.lat,data.lon);
	});
}

function getWeather(latitude,longitude){
	$.getJSON ("/weather?latitude="+latitude+"&longitude="+longitude,function(data){
		console.log(data);
	});
}

function getLocationFromZip(){
	var url = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+53212+"&key=AIzaSyAPap3f9CMf1Ad6Umm9LisnDJ_8dGj0jVU";
	$.getJSON(url, function(results){
		var latitude=results.results[0].geometry.location.lat;
		var longitude=results.results[0].geometry.location.lng;
		console.log(results.results[0].geometry.location.lat);
		console.log(results.results[0].geometry.location.lng);
    	}
 	);
}

function getForecast(){
	//https://api.forecast.io/forecast/APIKEY/LATITUDE,LONGITUDE

	var forecastHTML="<table class='table table-striped'>";
   	forecastHTML+="<th>Day</th><th>High</th><th>Low</th>";
	forecastHTML+="<tr><td> Day 1</td><td> Day's High </td><td> Day's Low</td></tr>"; 
	forecastHTML+="<tr><td> Day 2</td><td> Day's High </td><td> Day's Low</td></tr>";
	forecastHTML+="<tr><td> Day 3</td><td> Day's High </td><td> Day's Low</td></tr>";  
	forecastHTML+="<tr><td> Day 4</td><td> Day's High </td><td> Day's Low</td></tr>"; 
	forecastHTML+="<tr><td> Day 5</td><td> Day's High </td><td> Day's Low</td></tr>"; 
	forecastHTML+="</table>";

	var findIdForForecast=document.getElementById("forecast");
	findIdForForecast.innerHTML=forecastHTML;
}

//getLocation();
	/*var zip=document.getElementById("field").value;
	var ipLocation=document.getElementById("ip").value;
	var fbLocation=document.getElementById("facebook").value;*/

  
  /*"daily": {
    "summary": "No precipitation throughout the week, with temperatures rising to 68\u00b0F tomorrow.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1467702000,
        "summary": "Mostly cloudy throughout the day.",
        "icon": "partly-cloudy-day",
        "sunriseTime": 1467723287,
        "sunsetTime": 1467776171,
        "moonPhase": 0.05,
        "precipIntensity": 0,
        "precipIntensityMax": 0,
        "precipProbability": 0,
        "temperatureMin": 52.85,
        "temperatureMinTime": 1467784800,
        "temperatureMax": 61.69,
        "temperatureMaxTime": 1467759600,
        "apparentTemperatureMin": 52.85,
        "apparentTemperatureMinTime": 1467784800,
        "apparentTemperatureMax": 61.69,
        "apparentTemperatureMaxTime": 1467759600,
        "dewPoint": 51.25,
        "humidity": 0.84,
        "windSpeed": 9.19,
        "windBearing": 260,
        "visibility": 7.35,
        "cloudCover": 0.52,
        "pressure": 1014.84,
        "ozone": 312.26 */