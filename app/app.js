'use strict';

require('./style.scss');
require('angular');
require('angular-ui-router');
require('./cgi-list/cgi-list.js');
require('./cgi-route/cgi-route.js');

var app = angular.module('main', ['cgi-list', 'cgi-route']);

app.config(function() {
	console.log('config main');
});

app.run(function() {
	console.log('run main');
});

var cgiHeaderUrl = require('./tmpl/cgi-header.html');
var cgiBodyUrl = require('./tmpl/cgi-body.html');
var cgiFooterUrl = require('./tmpl/cgi-footer.html');

app.component('cgiHeader', {
	templateUrl: cgiHeaderUrl,
});

app.component('cgiBody', {
	templateUrl: cgiBodyUrl
});

app.component('cgiFooter', {
	templateUrl: cgiFooterUrl
});

/*app.directive('cgiHeader', function() {
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
});*/
