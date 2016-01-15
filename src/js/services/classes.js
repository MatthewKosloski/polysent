(function(){
	'use strict';
	angular.module('services')
		.factory('classes', [function(){
			return {
				pollUpvoted: 'poll-upvoted',
				searchBarVisible: 'search-bar--visible'
			};
		}]);
})();