(function(){
	'use strict';
	angular
		.module('directives')
		.directive('mobileAuxiliaryTrigger', ['classes', '$document', function(classes, $document) {
			return {
				restrict: 'A',
				link: function(scope, element, attr, Ctrl) {
					var auxiliaryLocation = angular.element($document[0].querySelector('.auxiliary__location')),
						auxiliarySorters = angular.element($document[0].querySelector('.auxiliary__sorters'));

					element.bind('click', function(){
						auxiliaryLocation.toggleClass(classes.auxiliaryLocation.active);
						auxiliarySorters.toggleClass(classes.auxiliarySorters.visible);
					});
				}
			};
		}]);
})();