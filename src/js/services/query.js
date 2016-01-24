(function(){
	'use strict';
	angular
		.module('services')
		.factory('Query', ['restangularPoll', function(restangularPoll){

			var factory = {};

			factory.get = function(query, page, perPage){
				return restangularPoll.one('search').get({q: query, page: page, per_page: perPage});
			};
		
			return factory;
		}]);
})();