(function(){
	'use strict';
	angular
		.module('directives')
		.directive('backgroundColor', [function() {
			return {
				restrict: 'A',
				link: function(scope, element, attrs, Ctrl) {
					attrs.$observe('backgroundColor', function(value) {
			            element.css({
			                'background-color': value
			            });
			        });
				}
			};
		}]);
})();