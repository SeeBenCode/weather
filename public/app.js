"use strict";

function getLocationFromIP(callback){
	var url = "http://ip-api.com/json";
	$.getJSON(url, function(data){
		callback(data.lat,data.lon);
	});
}

function getWeather(latitude,longitude,callback){
    var highTemperatures=[];
    var lowTemperatures=[];
	$.getJSON ("/weather?latitude="+latitude+"&longitude="+longitude,function(data){
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

function getLocationFromZip(zip,callback){
	var url = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+zip+"&key=AIzaSyAPap3f9CMf1Ad6Umm9LisnDJ_8dGj0jVU";
	$.getJSON(url, function(results){
		var latitude=results.results[0].geometry.location.lat;
		var longitude=results.results[0].geometry.location.lng;
		//console.log(results.results[0].geometry.location.lat);
		//console.log(results.results[0].geometry.location.lng);
    	}
 	);
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
