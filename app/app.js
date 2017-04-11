(function() {
	'use strict';

	var app = angular.module('main', ['cgi-list', 'cgi-route']);

	app.config(function() {
		console.log('config main');
	});

	app.run(function() {
		console.log('run main');
	});

	app.directive('cgiHeader', function() {
		return {
			restrict: 'E',
			templateUrl: './tmpl/cgi-header.html'
		};
	});

	app.directive('cgiBody', function() {
		return {
			restrict: 'E',
			templateUrl: './tmpl/cgi-body.html'
		}
	});

	app.directive('cgiFooter', function() {
		return {
			restrict: 'E',
			templateUrl: './tmpl/cgi-footer.html'
		}
	});
})();
