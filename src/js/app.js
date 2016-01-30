(function(){
	'use strict';
	angular
		.module('polysent', [
			'controllers', 
			'services', 
			'directives', 
			'filters', 
			'ui.router', 
			'LocalStorageModule',
			'ui.bootstrap'
		])
		.config([
			'$stateProvider', 
			'$urlRouterProvider', 
			'$locationProvider',
			'localStorageServiceProvider',
			'$provide',
			function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, $provide) {		
				$stateProvider
					.state('home', {
							url: '/',
							templateUrl: './templates/pages/home.html',
							controller: 'HomeCtrl'
						}
					)
					.state('about', {
							url: '/about',
							templateUrl: './templates/pages/about.html'						
						}
					)
					.state('faq', {
							url: '/faq',
							templateUrl: './templates/pages/faq.html'
						}
					)
					.state('single', {
							url: '/p/:id',
							templateUrl: './templates/pages/single.html',
							controller: 'SingleCtrl'
						}
					)
					.state('new', {
							url: '/new',
							templateUrl: './templates/pages/new.html',
							controller: 'NewCtrl'
						}
					)
					.state('search', {
							url: '/search',
							templateUrl: './templates/pages/search.html',
							controller: 'SearchCtrl'
						}
					);
				$urlRouterProvider.otherwise('/');

				// use the HTML5 History API
	        	$locationProvider.html5Mode(true);

	        	// set a prefix to avoid overwriting any local storage variables from the rest of the app
	        	localStorageServiceProvider.setPrefix('polysent');

	        	// replace the angular-ui default pagination template
	        	$provide.decorator('uibPaginationDirective', ['$delegate', function($delegate) {
			    	var directive = $delegate[0];
			    	directive.templateUrl = './templates/angular-ui/paginationOverride.tpl.html';
			    	return $delegate;
			    }]);
			}
		]);
})();