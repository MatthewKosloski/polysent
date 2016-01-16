(function(){
	'use strict';
	angular.module('directives')
	.directive('checkIfUpvoted', ['localStorage', 'classes', function(localStorage, classes) {
		return {
			link: function(scope, element, attributes) {
				var upvotesArray = localStorage.getArray('upvotes'),
					id = attributes.checkIfUpvoted;
				if(upvotesArray.indexOf(id) !== -1) {
					element.addClass(classes.pollUpvoted);
				}
			}
		};
	}]);
})();