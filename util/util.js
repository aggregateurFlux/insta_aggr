var toJson = function( element ) {
	return JSON.stringify( element );
};

var instagramAuthentification = function( port ) {
	//instagram needed for the authentification
	var redirect_uri = "http://localhost:" + port + "/auth/callBack";
	var clientId = "110ab74744844314844f42ad834da383";
	var clientSecret = "6e3ca7094d524c699dafbb961110fac7";
	var scope = ["basic","public_content","follower_list","comments","relationships","likes"];

	return {
		clientId : clientId,
		clientSecret : clientSecret,
		redirect_uri : redirect_uri,
		scope : scope
	};
};

module.exports = {
	toJson : toJson,
	instagramAuthentification : instagramAuthentification
};
