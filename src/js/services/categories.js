(function(){
	'use strict';
	angular
		.module('services')
		.factory('Categories', [function(){

			var arr = [
				'all categories', 
				'controversial', 
				'current events', 
				'entertainment', 
				'leisure', 
				'people',
				'personal',
				'politics',
				'random',
				'science',
				'sports',
				'technology',
				'uncategorized'
			];

			var filterCategories = [];
			for(var i = 0; i < arr.length; i++) {
				filterCategories.push({label: arr[i]});
			}

			arr.shift();
			// arr.unshift('choose a category');
			var newPollCategories = [];
			for(var j = 0; j < arr.length; j++) {
				newPollCategories.push({label: arr[j]});
			}

			return {
				filterCategories: filterCategories,
				newPollCategories: newPollCategories
			};
		}]);
})();