(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('MainCtrl', [
			'$scope', 
			'$location',
			'localStorage',
			'Categories',
			'polysentApi', 
			function($scope, $location, localStorage, Categories, polysentApi){

			$scope.searchInput = {};
			$scope.modal = {};
			$scope.$on('modal', function(event, data) { 
				$scope.modal = data;
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
					polysentApi.upvote(pollId).then(function(){
						upvotes.push(pollId);
						localStorage.pushArrayItem('upvotes', pollId);
					}, function(error){
						$scope.$emit('modal', {
							show: true,
							width: '480px',
							height: '330px',
							iconClass: 'icon-circle-cross',
							heading: (error.statusText) ?  error.statusText : 'Oh no!',
							subHeading: (error.data.message) ? error.data.message : 'An error occurred while upvoting the poll.',
							buttonText: 'close',
							animationClasses: ['modal__content--visible', 'modal__content--hidden'],
							buttonAction: function(){
								console.log('modal closed');
							}
						});
					});
				}
			};

			$scope.sendQuery = function(){
				$location.path('/search');
				$scope.$on('queryFn', function(event, query){
					query();
				});
			};

		}]
	);
})();