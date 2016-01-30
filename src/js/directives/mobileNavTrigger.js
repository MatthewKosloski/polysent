(function(){
	'use strict';
	angular
		.module('directives')
		.directive('mobileNavTrigger', ['classes', '$document', function(classes, $document) {
			return {
				restrict: 'A',
				link: function(scope, element, attr, Ctrl) {
					var nav = angular.element($document[0].querySelector('.mobile-nav')),
						hamburger = angular.element($document[0].querySelector('.hamburger')),
			      		globe = angular.element($document[0].querySelector('.globe'));

					element.bind('click', function(){
						hamburger.toggleClass(classes.hamburger.close);
						nav.toggleClass(classes.mobileNav.expand);
						globe.toggleClass(classes.globe.contract);
					});
				}
			};
		}]);
})();