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

			assert.equal( result, expected);
		});

		it("should return the str", function() {
			//Expected
			var expected = JSON.stringify("Page not found !");

			//Get
			var request = {};
			var response = {
				viewName: ""
				, data : {}
				, render: function(view, viewData) {
					viewName = view;
					data = viewData;
				}
			};

			var routes = require("../routes");

			var result = routes.error( request, response );


			assert.equal( result, expected );
		});
	});
});

describe("util", function() {
	it("sould return json", function() {
		var obj = {
			id : 'truc',
			libelle : "machin"
		};

		//Expected
		var expected = JSON.stringify( obj );

		//Get
		var util = require("../util");

		var result = util.toJson( obj );

		assert.equal( result, expected );
	});
});