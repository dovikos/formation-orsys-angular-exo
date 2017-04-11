(function() {
	'use strict';

	var app = angular.module('cgi-list', []);

	app.run(function($rootScope) {
		'ngInject';
		$rootScope.affaires = [];

		for (var i = 0; i < 10000; i++) {
			$rootScope.affaires.push({
				titre: 'Titre ' + i,
				description: 'Description ' + i
			});
		}
		console.log('$rootScope.affaires', $rootScope.affaires);
	});

	app.directive('cgiList', function() {
		return {
			restrict: 'E',
			controller: function CgiListCtrl($scope, $element, $attrs, $rootScope, $compile) {
				'ngInject';
				console.log('CgiListCtrl', arguments);
				var content = $element.html();
				$element.html('');

				for (var i = 0; i < 10; i++) {
					var html = '<div>' + content + '</div>';
                    var elt = angular.element(html);
					$element.append(elt);
                    var scope = $scope.$new(false);
                    var name = $attrs.name;
                    scope[name] = $rootScope.affaires[i];
					$compile(elt)(scope);
				}
			}
		}
	});
})();
