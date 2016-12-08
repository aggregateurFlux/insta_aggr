/*
Fonction appelé lors du Get sur l'index
*/
exports.index = function (request, responses) {

	var obj = {
		title : "Welcome !",
		body : "hello world"
	}


	return JSON.stringify( obj );
};