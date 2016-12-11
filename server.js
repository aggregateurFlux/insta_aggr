//Dependency 
var express = require("express");
var app = express();
var instagram = require('instagram-node').instagram();

//Perso
var routes = require("./routes");
var util = require("./util");

//Configuration
var port = 8000;

var instagramAuthentification = util.instagramAuthentification( port );

instagram.use({
  client_id: instagramAuthentification.clientId,
  client_secret: instagramAuthentification.clientSecret
});

//Routes

//Index
app.route("/")
	.get( function( request, response) {
		var result = routes.index( request, response);

		response.setHeader("Content-Type","text/json");
		response.end( result );
	});

app.get("/scope", function(request,response) {
	var scope = instagramAuthentification.scope;

	response.setHeader("Content-Type","text/json");
	response.end( util.toJson( scope ) );
});

app.get("/user/feed", function( request, response ) {
	routes.feed( request , response, instagram);
});

//Post Comment

app.post( "/media/:mediaId/addComment" , function( request, response ) {
	routes.addComment( request, response, instagram );
});

//Authentification
app.get("/auth/instagram", function( request , response ) {
	response.redirect( instagram.get_authorization_url( instagramAuthentification.redirect_uri , { scope : instagramAuthentification.scope, state: 'a state' } ) );
});

app.get("/auth/callBack", function( request , response) {
	instagram.authorize_user(request.query.code, instagramAuthentification.redirect_uri, function(err, result) {
		if (err) {
			console.log(err.body);
			response.send("Didn't work");
		} else {
			console.log('Yay! Access token is ' + result.access_token);
			console.log(" resutl : ",result);
			response.send( util.toJson( result ) );
		}
  	});
});

//Error 404
app.use( function ( request, response, next ) {
	var result = routes.error( request , response , next);

	response.setHeader('Content-Type', 'text/json');
    response.send(404, util.toJson( result ) );
});

console.log("Server running, please go to : http://localhost:"+port);

app.listen(port);