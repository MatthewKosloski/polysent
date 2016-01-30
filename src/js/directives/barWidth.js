(function(){
	'use strict';
	angular
		.module('directives')
		.directive('barWidth', [function() {
			return {
				restrict: 'A',
				link: function(scope, element, attrs, Ctrl) {
					attrs.$observe('barWidth', function(value) {
			            element.css({
			                'width': value + '%'
			            });
			        });
				}
			};
		}]);
})();