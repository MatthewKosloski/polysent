(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('HomeCtrl', [
			'$scope', 
			'Restangular', 
			'restangularPoll',
			'Categories', function($scope, Restangular, restangularPoll, Categories){

			$scope.categories = Categories.filterCategories;
			$scope.selectedCategory = Categories.filterCategories[0];

			$scope.postType = 'featured';

			$scope.polls = [];
			$scope.busyLoading = false;

			$scope.currentPollPage = 1;
			$scope.polls_per_page = 24;
			$scope.maxAmountOfPolls = 5;

			/*
				Function called by auxiliary tabs (featured, newest, most votes, etc.).
				This sets the postType, which dictates the posts
				that'll be loaded by the paginator.
			*/
			$scope.setPostType = function(type) {
				if($scope.postType === type) return;
				$scope.postType = type;
				$scope.polls = [];
				$scope.currentPollPage = 1;
				$scope.loadPollsByType($scope.postType);
			};

			/* 
				Applied to all polls. Allows user to filter 
				polls by category.
				Default: 'all' 
			*/
		    $scope.isViewable = function(poll) {
		    	var selected = $scope.selectedCategory;
		    	return selected.label === poll.category || selected.label === 'all categories';
		    };

			$scope.loadPollsByType = function(type){
				if($scope.busyLoading) return;
				$scope.busyLoading = true;
				$scope.polls = [];
				restangularPoll.one(type).get({page: $scope.currentPollPage, per_page: $scope.polls_per_page}).then(function(response) {
					$scope.polls = response.data.docs;
					$scope.totalPolls = response.data.total;
					$scope.busyLoading = false;
				});
			};

			$scope.loadPollsByType($scope.postType);
		}]);
})();