var util = require("../util");


var index = function (request, responses) {

	var obj = {
		title : "Welcome !",
		body : "hello world"
	};

	return util.toJson( obj );
};

var feed = require("./feed");

module.exports = {
	index : index,
	feed : feed,
	addComment : require("./addComment"),
	error : require("./404")
};