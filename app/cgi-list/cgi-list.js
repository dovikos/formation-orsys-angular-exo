(function() {
	'use strict';

	var app = angular.module('cgi-list', []);

	app.run(['$rootScope', function($rootScope) {
		$rootScope.affaires = [];

		for (var i = 0; i < 10000; i++) {
			$rootScope.affaires.push({
				titre: 'Titre ' + i,
				description: 'Description ' + i
			});
		}
	}]);

	app.directive('cgi-list', function() {
		return {
			restrict: 'E',
			controller: function CgiListCtrl() {
				console.log('CgiListCtrl', arguments);
			}
		}
	});
})();
