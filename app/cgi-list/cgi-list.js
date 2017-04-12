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

	app.service('infiniteListSrv', function InfiniteListSrv($rootScope) {
		'ngInject';
		this.getMore = function(start, qty) {
			if (isNaN(qty)) {
				console.error('\'qty\' is not a number', qty);
				return;
			}

			var result = $rootScope.affaires.slice(start, start + qty);
			start += qty;
			return result;
		}
	});

	app.service('debounceSrv', function DebounceSrv() {
		var map = {};
		this.run = function(name, offset, callback) {
			if (!map[name]) {
				map[name] = {};
			}
			if (!map[name].lastCall) {
				map[name].lastCall = new Date().getTime();
				callback();
				return;
			}
			if (map[name].lastCall > new Date().getTime() - offset) {
				return;
			}
			map[name].lastCall = new Date().getTime();
			callback();
		};
	});

	app.directive('cgiList', function() {
		return {
			restrict: 'E',
			controller: function CgiListCtrl($scope, $element, $attrs,
				$rootScope, $compile, infiniteListSrv, debounceSrv) {
				'ngInject';
				var ctrl = this;
				console.log('CgiListCtrl', arguments);
				var content = $element.html();
				$element.html('');

				window.onwheel = function() {
					console.log('Scrollllle', arguments);
					debounceSrv.run('cgiList', ctrl.offset, ctrl.getMore);
					$scope.$apply();
				};

				ctrl.$onInit = function() {
					ctrl.offset = 5000;
					ctrl.start = 0;
				};

				ctrl.getMore = function() {
					var qty = $attrs.qty || 10;
					qty = Number(qty);

					var array = infiniteListSrv.getMore(ctrl.start, qty);
					ctrl.start += qty;

					for (var i = 0; i < qty; i++) {
						var html = '<div>' + content + '</div>';
						var elt = angular.element(html);
						$element.append(elt);
						var scope = $scope.$new(false);
						var name = $attrs.name;
						scope[name] = array[i];
						$compile(elt)(scope);
					}
				}

				ctrl.getMore();
			}
		}
	});
})();
