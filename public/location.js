"use strict";

function Location(){

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


	function getLocationFromIP(callback){
		var url = "http://ip-api.com/json";
		$.getJSON(url, function(data){
			callback(data.lat,data.lon);
		});
	}

	function partiallyApplyGetLLFromCity(callback){
	    return function(locationName){
	        getLatLongFromCity(locationName,callback);
	    }
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

}