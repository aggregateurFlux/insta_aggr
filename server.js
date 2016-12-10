//Dependency 
var express = require("express");
var app = express();

//Perso
var routes = require("./routes");

//Server
var port = 8080;

//Routes

//Index
app.get("/", function( request, response) {
	var result = routes.index( request, response);

	response.setHeader("Content-Type","text/json");
	response.end( result );
});

//Error
app.use(function(request, response, next) {
    response.setHeader('Content-Type', 'text/json');
    response.send(404, JSON.stringify( 'Page not found !') );
});

console.log("Server running, please go to : http://localhost:"+port);

app.listen(port);