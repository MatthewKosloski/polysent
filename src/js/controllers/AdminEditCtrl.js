(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('AdminEditCtrl', [
			'$scope', 
			'$stateParams', 
			'$location',
			'Categories',
			'polysentApi', function($scope, $stateParams, $location, Categories, polysentApi){

			$scope.poll = [];
			$scope.categories = Categories.newPollCategories;

			polysentApi.single($stateParams.id).then(function(response) {
				$scope.poll = response.data[0];
			}, function(error){
				if(error.status === 404) {
					$location.path('/admin');
					return;
				}
			});

		}]);
})();