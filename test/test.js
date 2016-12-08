var assert = require('assert');

describe('routes', function() {
	describe('index', function() {
		it('should return title and body', function() {
			//Expected
			var expected = JSON.stringify({
				title : "Welcome !",
				body : "hello world"
			});

			//Get
			var routes = require("../routes");

			var result = routes.index();

			console.log("result : ", result);

			assert.equal( result, expected);
		});
	});
});