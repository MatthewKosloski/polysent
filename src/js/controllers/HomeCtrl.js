(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('HomeCtrl', [
			'$scope', 
			'Categories',
			'polysentApi',
			function($scope, Categories, polysentApi){

			$scope.categories = Categories.filterCategories;
			$scope.selectedCategory = Categories.filterCategories[0];

			$scope.postType = 'featured';

			$scope.polls = [];
			$scope.busyLoading = false;

			$scope.currentPollPage = 1;
			$scope.polls_per_page = 24;
			$scope.maxAmountOfPolls = 3;

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
				polysentApi.getPollsByType(type, $scope.currentPollPage, $scope.polls_per_page).then(function(response){
					$scope.polls = response.data.docs;
					$scope.totalPolls = response.data.total;
					$scope.busyLoading = false;
				}, function(error){
					$scope.$emit('modal', {
						show: true,
						width: '480px',
						height: '330px',
						iconClass: 'icon-circle-cross',
						heading: (error.statusText) ?  error.statusText : 'Oh no!',
						subHeading: (error.data.message) ? error.data.message : 'An error occurred while retrieving the polls.',
						buttonText: 'close',
						animationClasses: ['modal__content--visible', 'modal__content--hidden'],
						buttonAction: function(){
							$scope.busyLoading = false;
							$scope.$apply();
						}
					});
				});
			};

			$scope.setCategory = function(category) {
				$scope.selectedCategory = category;
			};

			$scope.loadPollsByType($scope.postType);
		}]);
})();