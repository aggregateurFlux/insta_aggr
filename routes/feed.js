var util = require("../util");

var feed = function( request, response, instagram ) {
	var accessToken = request.headers.access_token;

	instagram.use( { access_token: accessToken } );

	var retry_follows = user_self_follows("GET", "/users/self/follows", {}, function(err, users, remaining, limit) {
		if(err) {
			console.log("error user follows : ", err);
		}

		var options = {
			count : 10
		};

		var data = [];

		for (var i = 0; i < users.data.length; i++) {
			var id_follows = users.data[i].id;
			var name_follows = users.data[i].full_name;

			instagram.user_media_recent( id_follows, options , function(err, results, pagination, remaining, limit) {
				for ( var j =0; j < results.length; j++ ) {
					var onePost = {
						idAuthor : id_follows,
						authorName : name_follows,
						postId : results[j].id,
						postCreatedAt : results[j].created_time,
						imageLink : results[j].link
					}

					//if text is written
					if( results[j].caption ) {
						onePost.content = results[j].caption.text
					} else {
						onePost.content = "";
					}

					data.push( onePost );
				};

				response.setHeader("Content-Type","text/json");
				response.end( util.toJson( data ) );
			});
		};
	}, retry_follows );
	

	function user_self_follows( method,path,params,callBack,retry) {
		instagram.call( method, path, params, callBack, retry );
	};
};

module.exports = feed;