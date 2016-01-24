(function(){
	'use strict';
	angular
		.module('directives')
		.directive('mobileAuxiliaryTrigger', ['classes', function(classes) {
			return {
				restrict: 'A',
				link: function(scope, element, attr, Ctrl) {
					var auxiliaryLocation = $('.auxiliary__location'),
						auxiliarySorters = $('.auxiliary__sorters');

					element.bind('click', function(){
						auxiliaryLocation.toggleClass(classes.auxiliaryLocation.active);
						auxiliarySorters.toggleClass(classes.auxiliarySorters.visible);
					});
				}
			};
		}]);
})();