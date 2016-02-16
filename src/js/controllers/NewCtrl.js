(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('NewCtrl', [
			'$scope', 
			'$location', 
			'Categories',
			'polysentApi', function($scope, $location, Categories, polysentApi){

			$scope.categories = Categories.newPollCategories;

			$scope.newPoll = {};
			$scope.newPoll.options = [];

			/*
				display 2 options as default and have 1 
				option ready to fade in on request.
			*/

			var defaultOptions = [
				{
					name: 'option 1',
					hide: false
				}, 
				{
					name: 'option 2', 
					hide: false
				}, 
				{
					name: 'option 3',
					hide: true
				}, 
			];

			$scope.options = angular.copy(defaultOptions);

			$scope.addOption = function(){
				var len = $scope.options.length;
				var counter = len + 1;
				$scope.options[len - 1].hide = false;
				$scope.options.push({name: 'option' + counter, hide: true});
				counter++;
			};

			var defaultForm = {
				category: '',
				options: [],
				question: ''
			};

			$scope.resetForm = function(){
				$scope.newPoll = angular.copy(defaultForm);
				$scope.options = angular.copy(defaultOptions);
			};

			$scope.addPoll = function(){
				$scope.loading = true;
				polysentApi.create($scope.newPoll).then(function(response) {
				    if(response.status === 200) {
				    	$scope.$emit('modal', {
							show: true,
							width: '480px',
							height: '330px',
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
							width: '480px',
							height: '330px',
							iconClass: 'icon-circle-cross',
							heading: (error.statusText) ?  error.statusText : 'Oh no!',
							subHeading: (error.data.message) ? error.data.message : 'An error occurred while saving the poll.',
							buttonText: 'try again',
							animationClasses: ['modal__content--visible', 'modal__content--hidden'],
							buttonAction: function(){
								console.log('trying again');
							}
						});
				});
			};

		}]);
})();