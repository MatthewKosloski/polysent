(function(){
	'use strict';
	angular
		.module('services')
		.factory('restangularPoll', ['Restangular', function(Restangular){
			return Restangular.all('api');
		}]);
})();