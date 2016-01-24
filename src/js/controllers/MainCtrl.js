(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('MainCtrl', [
			'$scope', 
			'$location', 
			'Restangular',
			'localStorage',
			'Categories',
			'restangularPoll',
			'Query', function($scope, $location, Restangular, localStorage, Categories, restangularPoll, Query){

			$scope.modal = {};
			$scope.$on('modal', function(event, args) { 
				$scope.modal.show = args.show;
				$scope.modal.width = args.width;
				$scope.modal.height = args.height;
				$scope.modal.iconClass = args.iconClass;
				$scope.modal.heading = args.heading;
				$scope.modal.subHeading = args.subHeading;
				$scope.modal.buttonText = args.buttonText;
				$scope.modal.buttonAction = args.buttonAction;
				$scope.modal.animationClasses = args.animationClasses;
			});
				
			if(localStorage.getItem('upvotes') === null) {
				localStorage.pushArrayItem('upvotes', 0);
			} 

			$scope.localStorageUpvotes = localStorage.getArray('upvotes');
			
			var upvotes = ($scope.localStorageUpvotes.length) ? $scope.localStorageUpvotes : [];

			$scope.isActive = function(route) {
				return (route === $location.path());
			};

			$scope.getPercentage = function(vote, total){
				if(vote && total) {
					return ((vote/total) * 100).toFixed();
				} else {
					return 0;
				}
			};

			$scope.isPlural = function(num){
				return (num === 0 || num > 1) ? true : false;
			};

			$scope.getUpvotes = function(){
				return $scope.localStorageUpvotes;
			};

			$scope.upvote = function(poll) {
				var pollId = poll._id;
				if(upvotes.indexOf(pollId) === -1) {
					upvotes.push(pollId);
					localStorage.pushArrayItem('upvotes', pollId);
					restangularPoll.one('poll').one(pollId.toString(), 'upvote').put();
				}
			};

			$scope.queries = [];
			$scope.busyLoading = false;

			$scope.currentQueryPage = 1;
			$scope.queries_per_page = 24;
			$scope.maxAmountOfQueries = 5;

			// called on search form submission
			$scope.query = function(){
				if($scope.searchInput.length === 0 || $scope.busyLoading) return;
				$scope.currentQueryPage = 1;
				$scope.busyLoading = true;
				$scope.queries = [];
				$location.path('/search');
				Query.get($scope.searchInput, $scope.currentQueryPage, $scope.queries_per_page).then(function(response){
					$scope.queries = response.data.docs;
					$scope.totalQueries = response.data.total;
					$scope.busyLoading = false;
				}, function(error){
					console.log(error);
				});
			};
		}]
	);
})();