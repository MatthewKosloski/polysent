(function(){
	'use strict';
	angular
		.module('services')
		.factory('classes', [function(){
			return {
				poll: {
					upvoted: 'poll-upvoted'
				},
				searchBar: {
					visible: 'search-bar--visible'
				},
				hamburger: {
					close: 'hamburger--x'
				},
				mobileNav: {
					expand: 'mobile-nav--expand'
				},
				globe: {
					contract: 'globe--contract'
				},
				auxiliaryLocation: {
					active: 'auxiliary__location--active'
				},
				auxiliarySorters: {
					visible: 'auxiliary__sorters--visible'
				}
			};
		}]);
})();