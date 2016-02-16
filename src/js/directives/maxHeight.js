(function(){
	'use strict';
	angular
		.module('directives')
		.directive('maxHeight', [function() {
			return {
				restrict: 'A',
				link: function(scope, element, attrs, Ctrl) {
					attrs.$observe('maxHeight', function(value) {
			            element.css({
			                'max-height': value
			            });
			        });
				}
			};
		}]);
})();