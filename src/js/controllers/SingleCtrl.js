(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('SingleCtrl', [
			'$scope', 
			'$stateParams', 
			'localStorage',
			'$location',
			'polysentApi', function($scope, $stateParams, localStorage, $location, polysentApi){

			$scope.single = [];
			$scope.related = [];

			// get the requested poll
			if($stateParams.id) {
				polysentApi.single($stateParams.id).then(function(response) {
					$scope.single = response.data[0];
					// get the related polls (4)
					polysentApi.randomCategory($scope.single.category).then(function(response) {
						$scope.related = $scope.related.concat(response.data);
					});
				}, function(error){
					if(error.status === 404) {
						$location.path('/');
						return;
					}
				});
			} else if($location.path() === '/random'){
				polysentApi.randomPoll().then(function(response) {
					$scope.single = response.data[0];
					// get the related polls (4)
					polysentApi.randomCategory($scope.single.category).then(function(response) {
						$scope.related = $scope.related.concat(response.data);
					});
				}, function(error){
					if(error.status === 404) {
						$location.path('/');
						return;
					}
				});
			}
			
			$scope.vote = function(pollId, index) {
				/*
					Create localstorage array if it doesn't
					exist. (e.x., polysent.poll-42 => ['-1'])
				*/
				var arr = ('poll-' + pollId);
				if(localStorage.getItem(arr) === null) {
					localStorage.pushArrayItem(arr, -1);
				} 
				
				/*
					Every time a vote is cast, push the index of
					the option to the local storage array.
				*/
				localStorage.pushArrayItem(arr, index);

				var localStorageVotes = localStorage.getArray(arr);
				var len = localStorageVotes.length;
				var changes = localStorageVotes.slice(len - 2, len + 1);
				if(changes[0] === -1) {
					$scope.single.options[changes[1]].votes++;
					$scope.single.totalVotes++;
				} else {
					$scope.single.options[changes[0]].votes--;
					$scope.single.options[changes[1]].votes++;
				}
				polysentApi.vote(pollId, changes[0], changes[1]).then(function(){

				}, function(error){
					$scope.$emit('modal', {
						show: true,
						width: '480px',
						height: '330px',
						iconClass: 'icon-circle-cross',
						heading: (error.statusText) ?  error.statusText : 'Oh no!',
						subHeading: (error.data.message) ? error.data.message : 'An error occurred while submitting your vote.',
						buttonText: 'close',
						animationClasses: ['modal__content--visible', 'modal__content--hidden'],
						buttonAction: function(){
							console.log('close modal');
						}
					});
				});
			};

			$scope.isVoted = function(pollId, index){
				var arr = ('poll-' + pollId);
				var localStorageVotes = localStorage.getArray(arr);
				var len = localStorageVotes.length;
				var lastItem = localStorageVotes.slice(len - 1, len);
				var isVoted = (lastItem[0] === index);
				if(localStorageVotes === null) return;
				return isVoted;
			};
		}]);
})();