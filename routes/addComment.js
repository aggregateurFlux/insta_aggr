var util = require("../util");

var addComment = function( request , response, instagram ) {
	var mediaId = request.params.mediaId;
	var text = request.headers.content;
	var accessToken = request.headers.access_token;
	
	var options = {
		sign_request: { 
			client_secret: accessToken
		}
	};

	//@param media_id string the media id
	//@param text string the text to post
	//@param options object { sign_request: { client_secret: 'xxx' }}
	//@param cb function (err, limit);
	instagram.add_comment( mediaId , text, options, function(err, limit) {
		if( err ) {
			console.log("err : ", err);
			response.end( util.toJson(err) );
		} else {
			console.log("success");

			var success = {
				status : "200",
				message : "successufly posted"
			};

			response.setHeader("Content-Type","text/json");
			response.send( util.toJson( success ) )
		}
	});
};

module.exports = addComment;