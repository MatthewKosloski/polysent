(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('NewCtrl', [
			'$scope', 
			'restangularPoll', 
			'Restangular', 
			'$location', 
			'Categories', function($scope, restangularPoll, Restangular, $location, Categories){

			$scope.categories = Categories.newPollCategories;

			$scope.newPoll = {};
			$scope.newPoll.options = [];

			// display 2 options as default
			$scope.options = ['option 1', 'option 2'];

			$scope.addOption = function(){
				var counter = $scope.options.length + 1;
				$scope.options.push(('option ' + counter));
				counter++;
			};

			$scope.addPoll = function(){
				$scope.newPoll.category = $scope.newPoll.category.label;
				Restangular.one('api').post('new', $scope.newPoll).then(function(response) {
				    if(response.status === 200) {
				    	$scope.message = 'Poll has been submitted!';
				    	$location.path('/p/' + response.data._id);
				    }
				}, function(error){
					console.log(error);
				});
			};

		}]);
})();