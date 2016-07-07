var express=require("express");
var app=express();


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
	console.log(request);
  getJSON(url, function(error,data){
		response.send(JSON.stringify(data));	
	});
});


