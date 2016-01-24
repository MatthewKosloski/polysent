(function(){
	'use strict';
	angular
		.module('directives')
		.directive('mobileNavTrigger', ['classes', function(classes) {
			return {
				restrict: 'A',
				link: function(scope, element, attr, Ctrl) {
					var nav = $('.mobile-nav'),
						hamburger = $('.hamburger'),
			      		globe = $('.globe');

					element.bind('click', function(){
						hamburger.toggleClass(classes.hamburger.close);
						nav.toggleClass(classes.mobileNav.expand);
						globe.toggleClass(classes.globe.contract);
					});
				}
			};
		}]);
})();