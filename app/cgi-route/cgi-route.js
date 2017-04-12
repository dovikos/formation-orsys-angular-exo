(function() {
	'use strict';

	var app = angular.module('cgi-route', ['ui.router']);

	app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
		'ngInject';

		$locationProvider
			.html5Mode(true);

		var homeState = {
			name: 'home',
			url: '/',
			templateUrl: './cgi-route/tmpl/home.html'
		}

		var productState = {
			name: 'produits',
			url: '/produits',
			templateUrl: './cgi-route/tmpl/produits.html',
			controller: 'ProduitsCtrl',
			controllerAs: '$ctrl'
		}

		var serviceState = {
			name: 'services',
			url: '/services',
			templateUrl: './cgi-route/tmpl/services.html'
		}

		var contactState = {
			name: 'contact',
			url: '/contact',
			templateUrl: './cgi-route/tmpl/contact.html'
		}

		$stateProvider.state(homeState);
		$stateProvider.state(productState);
		$stateProvider.state(serviceState);
		$stateProvider.state(contactState);
		$urlRouterProvider.otherwise('/');
	});

	app.controller('ProduitsCtrl', function ProduitsCtrl($http, $q) {
		'ngInject';
		console.log('ProduitsCtrl', arguments);
		var ctrl = this;
		ctrl.start = function() {
			console.log('start', arguments);
			$http.get('../ws/s1')
				.then(function(response) {
					console.log('response', response);
					return $q.all([
						$http.get('../ws/s2')
						.then(function(response) {
							return $http.get('../ws/s6');
						}),
						$http.get('../ws/s3'),
						$http.get('../ws/s4')
					]);
				})
				.then(function(responses) {
					console.log('responses', responses);
					return $http.get('../ws/s5');
				})
				.then(function(response) {
					console.log('response', response);
					console.log('FINI');
				})
				.catch(function(error) {
					console.error('error', error);
				});
		};
	});
})();
