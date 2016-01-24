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

			var defaultForm = {
				category: '',
				options: [],
				question: ''
			};

			$scope.resetForm = function(){
				$scope.newPoll = angular.copy(defaultForm);
				$scope.options = ['options 1', 'option 2'];
			};

			$scope.addPoll = function(){
				$scope.loading = true;
				Restangular.one('api').post('new', $scope.newPoll).then(function(response) {
				    if(response.status === 200) {
				    	$scope.$emit('modal', {
							show: true,
							width: 480,
							height: 330,
							iconClass: 'icon-circle-check',
							heading: 'Success!',
							subHeading: 'Your poll has been submitted.',
							buttonText: 'continue to poll',
							animationClasses: ['modal__content--visible', 'modal__content--hidden'],
							buttonAction: function(){
								var path = '/p/' + response.data._id;
								$location.path(path);
							}
						});
						$scope.resetForm();
						$scope.loading = false;
				    }
				}, function(error){
						$scope.$emit('modal', {
							show: true,
							width: 480,
							height: 330,
							iconClass: 'icon-circle-cross',
							heading: (error.statusText) ?  error.statusText : 'Oh no!',
							subHeading: (error.data.message) ? error.data.message : 'An error occurred while saving the poll.',
							buttonText: 'try again',
							animationClasses: ['modal__content--visible', 'modal__content--hidden'],
							buttonAction: function(){
								console.log('trying again...');
							}
						});
				});
			};

		}]);
})();