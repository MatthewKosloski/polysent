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
			    		views: {
			    			'': {
			    				templateUrl: './templates/layouts/primary.html'
			    			},
			    			'@home': {
			    				templateUrl: './templates/pages/home.html',
			    				controller: 'HomeCtrl'
			    			}
			    		} 
					})
					.state('about', {
				    	url: '/about',
			    		views: {
			    			'': {
			    				templateUrl: './templates/layouts/primary.html'
			    			},
			    			'@about': {
			    				templateUrl: './templates/pages/about.html',
			    			}
			    		} 
					})
					.state('faq', {
				    	url: '/faq',
			    		views: {
			    			'': {
			    				templateUrl: './templates/layouts/primary.html'
			    			},
			    			'@faq': {
			    				templateUrl: './templates/pages/faq.html',
			    			}
			    		} 
					})
					.state('single', {
				    	url: '/p/:id',
			    		views: {
			    			'': {
			    				templateUrl: './templates/layouts/primary.html'
			    			},
			    			'@single': {
			    				templateUrl: './templates/pages/single.html',
			    				controller: 'SingleCtrl'
			    			}
			    		} 
					})
					.state('new', {
				    	url: '/new',
			    		views: {
			    			'': {
			    				templateUrl: './templates/layouts/primary.html'
			    			},
			    			'@new': {
			    				templateUrl: './templates/pages/new.html',
			    				controller: 'NewCtrl'
			    			}
			    		} 
					})
					.state('search', {
				    	url: '/search',
			    		views: {
			    			'': {
			    				templateUrl: './templates/layouts/primary.html'
			    			},
			    			'@search': {
			    				templateUrl: './templates/pages/search.html',
			    				controller: 'SearchCtrl'
			    			}
			    		} 
					})
					.state('random', {
				    	url: '/random',
			    		views: {
			    			'': {
			    				templateUrl: './templates/layouts/primary.html'
			    			},
			    			'@random': {
			    				templateUrl: './templates/pages/single.html',
			    				controller: 'SingleCtrl'
			    			}
			    		} 
					})
					.state('adminHome', {
				    	url: '/admin',
			    		views: {
			    			'': {
			    				templateUrl: './templates/layouts/admin.html'
			    			},
			    			'@adminHome': {
			    				templateUrl: './templates/pages/admin-home.html',
			    				controller: 'AdminHomeCtrl'
			    			}
			    		} 
					})
					.state('adminEdit', {
				    	url: '/admin/edit/:id',
			    		views: {
			    			'': {
			    				templateUrl: './templates/layouts/admin.html'
			    			},
			    			'@adminEdit': {
			    				templateUrl: './templates/pages/admin-edit.html',
			    				controller: 'AdminEditCtrl'
			    			}
			    		} 
					});
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