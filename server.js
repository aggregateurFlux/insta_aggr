//Dependency 
var app = require("express")();

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


app.listen(port);