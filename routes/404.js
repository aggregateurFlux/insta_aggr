var util = require("../util");

var error = function(request, response, next) {
    response.setHeader('Content-Type', 'text/json');
    response.send(404, util.toJson( 'Page not found !') );
};

module.exports = error;
