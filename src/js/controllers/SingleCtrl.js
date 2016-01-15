(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('SingleCtrl', [
			'$scope', 
			'$stateParams', 
			'Restangular', 
			'localStorage',
			'restangularPoll',
			'$location', function($scope, $stateParams, Restangular, localStorage, restangularPoll, $location){

			if(isNaN($stateParams.id)) $location.path('/');

			$scope.single = [];
			$scope.related = [];

			// get the requested poll
			restangularPoll.one('poll', $stateParams.id.toString()).get().then(function(response) {
				$scope.single = response.data[0];
				// get the related polls (4)
				restangularPoll.one('random', $scope.single.category).get().then(function(response) {
					$scope.related = $scope.related.concat(response.data);
				});
			}, function(error){
				if(error.status === 404) {
					$location.path('/');
					return;
				}
			});

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
				restangularPoll.one('poll').one(pollId.toString(), 'vote').put({decrement: changes[0], increment: changes[1]});
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