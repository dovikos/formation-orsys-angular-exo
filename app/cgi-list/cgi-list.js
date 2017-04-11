(function() {
	'use strict';

	var app = angular.module('cgi-list', []);

	app.config(function() {
		console.log('config cgi-list');
	});

	app.run(function() {
		console.log('run cgi-list');
	});

	app.run(function($rootScope) {
		'ngInject';
		$rootScope.affaires = [];

		for (var i = 0; i < 10000; i++) {
			$rootScope.affaires.push({
				titre: 'Titre ' + i,
				description: 'Description ' + i
			});
		}
		//console.log('$rootScope.affaires', $rootScope.affaires);
	});

	app.directive('cgiList', function() {
		return {
			restrict: 'E',
			controller: function CgiListCtrl($scope, $element, $attrs, $rootScope, $compile) {
				'ngInject';
				var ctrl = this;
				console.log('CgiListCtrl', arguments);
				var content = $element.html();
				$element.html('');

				ctrl.start = 0;

				window.onwheel = function() {
					console.log('Scrollllle', arguments);
					ctrl.getMore();
					$scope.$apply();
				};

				ctrl.$onInit = function() {
					ctrl.lastCall = new Date();
					ctrl.offset = 0.5;
				};

				ctrl.getMore = function() {
					ctrl.now = new Date();
					var d = new Date(ctrl.lastCall);
					d.setSeconds(d.getSeconds + ctrl.offset);
					if (ctrl.now < d) {
						return;
					}
					ctrl.lastCall = ctrl.now;
					var qty = $attrs.qty || 10;
					qty = Number(qty);

					for (var i = ctrl.start; i < ctrl.start + qty; i++) {
						var html = '<div>' + content + '</div>';
						var elt = angular.element(html);
						$element.append(elt);
						var scope = $scope.$new(false);
						var name = $attrs.name;
						scope[name] = $rootScope.affaires[i];
						$compile(elt)(scope);
					}
					ctrl.start += qty;
				}

				ctrl.getMore();
			}
		}
	});
})();
