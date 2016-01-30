(function(){
	'use strict';
	angular
		.module('directives')
		.directive('poll', ['classes', function(classes) {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'templates/directives/poll.html',
				scope: {
					upvote: '&pollUpvote',
	  				data: '=pollData'
				},
				controller: ['$scope', function($scope) {
					var data = $scope.data;
					$scope.id = data._id;
					$scope.question = data.question;
					$scope.upvotes = data.upvotes;
					$scope.options = data.options;
					$scope.totalVotes = this.totalVotes = data.totalVotes;
					$scope.options.forEach(function(element, index, array) {
						var option = array[index];
						option.percentage = Math.round(((option.votes/$scope.totalVotes)*100));
						option.alpha = (option.percentage/100);
					});
				}],
				link: function(scope, element, attributes, Ctrl) {
					var upvote = scope.upvote(),
						el = angular.element(element[0].querySelector('.poll-upvote'));
				  	el.bind('click', function(e){
						e.preventDefault();
						upvote(scope.data);
						el.addClass(classes.poll.upvoted);
						scope.upvotes++;
				  	});
				}
			};
		}]);
})();