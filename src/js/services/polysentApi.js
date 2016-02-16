(function(){
	'use strict';
	angular
		.module('services')
		.factory('polysentApi', ['$http', function($http){
			var factory = {};

			factory.getPollsByType = function(type, page, perPage, order){
				return $http({
					method: 'GET',
					url: '/api/' + type,
					params: {
						page: page,
						per_page: perPage,
						order: order ? order : 'desc'
					}
				});
			};

			factory.upvote = function(id){
				var pollId = id.toString();
				return $http({
					method: 'PUT',
					url: '/api/poll/' + pollId + '/upvote'
				});
			};

			factory.search = function(query, page, perPage){
				return $http({
					method: 'GET',
					url: '/api/search',
					params: {
						q: query,
						page: page,
						per_page: perPage
					}
				});
			};

			factory.create = function(newPoll){
				return $http({
					method: 'POST',
					url: '/api/new',
					data: newPoll
				});
			};

			factory.single = function(id){
				var pollId = id.toString();
				return $http({
					method: 'GET',
					url: '/api/poll/' + pollId
				});
			};

			factory.randomCategory = function(category){
				return $http({
					method: 'GET',
					url: '/api/random/' + category
				});
			};

			factory.randomPoll = function(){
				return $http({
					method: 'GET',
					url: '/api/random'
				});
			};

			factory.vote = function(id, decrement, increment){
				var pollId = id.toString();
				return $http({
					method: 'PUT',
					url: '/api/poll/' + pollId + '/vote',
					params: {
						decrement: decrement,
						increment: increment
					}
				});
			};

			return factory;
		}]);
})();