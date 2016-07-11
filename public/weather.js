"use strict";

function Weather(){

    function partiallyApplyGetWeather(callback){
        return function(latitude,longitude){
            getWeather(latitude,longitude,callback);

        }
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
}
