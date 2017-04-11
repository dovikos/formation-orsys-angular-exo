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
			templateUrl: './cgi-route/tmpl/produits.html'
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
})();
