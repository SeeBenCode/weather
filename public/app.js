"use strict";

$(document).ready(function(){
  $("#userweather").hide();
});

function getLocationFromFacebook(callback){
    FB.api("/me?fields=location", function(response) {
        console.log(response.location.name);
        var cityState= response.location.name;
        if(response && !response.error){
        }
     console.log(cityState);
     callback(cityState);
    });
}

function partiallyApplyGetLLFromCity(callback){
    return function(locationName){
        getLatLongFromCity(locationName,callback);
    }
}

function partiallyApplyGetWeather(callback){
    return function(latitude,longitude){
        getWeather(latitude,longitude,callback);

    }()//trying to figure out the IIFE
}


function getLatLongFromCity(locationName,callback){
    console.log(locationName);
    var url = "http://maps.googleapis.com/maps/api/geocode/json?address="+locationName+"&sensor=false";
    $.getJSON(url, function(results){
        console.log(results.results[0].geometry.location.lat);
        var latitude=results.results[0].geometry.location.lat;
        var longitude=results.results[0].geometry.location.lng;
        console.log(latitude);
        console.log(longitude);
        callback(latitude,longitude);
        });
}

function getLocationFromIP(callback){
	var url = "http://ip-api.com/json";
	$.getJSON(url, function(data){
		callback(data.lat,data.lon);
	});
}

function getLocationFromZip(callback){
    var zip=document.getElementById("zip").value
    var url = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+zip+"&key=AIzaSyAPap3f9CMf1Ad6Umm9LisnDJ_8dGj0jVU";
    $.getJSON(url, function(results){
        var latitude=results.results[0].geometry.location.lat;
        var longitude=results.results[0].geometry.location.lng;
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
    $("#userweather").show();
	var forecastHTML="<table class='table table-responsive' id='table'>";
   	forecastHTML+="<th style='background-color:#679289'>Day</th><th style='background-color:#679289'>High</th><th style='background-color:#679289'>Low</th>";
    for(var i=0; i<5; i++){
       forecastHTML+="<tr><td> Day"+(i+1)+"</td><td>"+ Math.round(highTemperatures[i]) +"&deg</td><td>"+Math.round(lowTemperatures[i])+"&deg</td></tr>"; 
    }
    forecastHTML+="</table>";

    $("#forecast").html(forecastHTML);
    //var findIdForForecast=document.getElementById("forecast");
    //findIdForForecast.innerHTML=forecastHTML;
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

 .css,  .attr/.val, .on, .ajax/.get/.load

*/