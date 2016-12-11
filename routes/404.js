var util = require("../util");

var error = function(request, response, next) {
    return ( util.toJson( "Page not found !" ) );
};

module.exports = error;
