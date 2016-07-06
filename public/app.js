"use strict";

function getLocation(){
	var url = "http://ip-api.com/json";
	$.getJSON(url, function(data){
		console.log(data.lon); //var longitude=
		console.log(data.lat); //var latitude=
    	}
 	);
}

function getLocationWithAddress(){
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA8ni_waYhrCLb5z_hhZfpgvGx-mCns9kA";
	$.getJSON(url, function(data){
		console.log(data); //var longitude=
		//.log(data.geometry.lat); //var latitude=
    	}
 	);
}

function getForecast(){
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

getLocation();
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