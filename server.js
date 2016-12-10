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

/*
always empty
app.get("/user/feed", function( request , response ) {
	//console.log(" userId : ", request.params.userId );
	var accessToken = request.headers.access_token;
	
	instagram.use( { access_token: accessToken } );

	var options = {
		count : 10 
	};

	//@param options object { count,  [opt] min_id, [opt] max_id  [opt] }
   	//@param cb function (err, feed, pagination, remaining, limit);
	

	instagram.user_self_feed( options , function (err, feed, pagination, remaining, limit) {
		console.log("user self feed");
		console.log("feed : ", feed);
	});

	//instagram.use( )
});
*/

app.get("/user/media/recent", function( request, response ) {
	var accessToken = request.headers.access_token;

	instagram.use( { access_token: accessToken } );

	var retry = user_self("GET", "/user/self", {},  function(err, result, remaining, limit) {
    	if(err) {
			console.log("error : ", err);
		}
		console.log("result :", result);
	}, retry );

	

	function user_self(method,path,params,callBack,retry) {
		instagram.call( method, path, params, callBack, retry );
	}
  
	//@param user_id string the user id
	//@param options object { count, [opt] max_timestamp, [opt] min_timestamp, [opt] max_id, [opt] min_id }
	//@param cb(err, results, pagination, remaining, limit);

	//instagram.user_media_recent()
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
			//response.send('You made it!!');
			response.send( util.toJson( result ) );
		}
  	});
});

//Error 404
app.use(function(request, response, next) {
    response.setHeader('Content-Type', 'text/json');
    response.send(404, util.toJson( 'Page not found !') );
});

console.log("Server running, please go to : http://localhost:"+port);

app.listen(port);