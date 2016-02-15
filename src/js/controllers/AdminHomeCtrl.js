(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('AdminHomeCtrl', [
			'$scope', 
			'polysentApi', 
			function($scope, polysentApi){

				$scope.postType = 'newest';
				$scope.currentPollPage = 1;
				$scope.polls_per_page = 24;
				$scope.maxAmountOfPolls = 3;
				$scope.polls = [];
				$scope.busyLoading = false;

				$scope.loadPollsByType = function(type){
					if($scope.busyLoading) return;
					$scope.busyLoading = true;
					$scope.polls = [];
					polysentApi.getPollsByType(type, $scope.currentPollPage, $scope.polls_per_page).then(function(response){
						$scope.polls = response.data.docs;
						$scope.totalPolls = response.data.total;
						$scope.busyLoading = false;
					}, function(error){
						console.log(error);
						$scope.busyLoading = false;
					});
				};

				$scope.loadPollsByType('newest');



		}]);
})();