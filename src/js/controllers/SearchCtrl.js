(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('SearchCtrl', [
			'$scope', 
			'polysentApi', 
			'$location', function($scope, polysentApi, $location){

			$scope.queries = [];
			$scope.busyLoading = false;
			$scope.currentQueryPage = 1;
			$scope.queries_per_page = 24;
			$scope.maxAmountOfQueries = 5;

			$scope.query = function(arg){
				if($scope.busyLoading) return;
				$scope.busyLoading = true;
				if(arg !== 'pagination') {
					$scope.currentQueryPage = 1;
				}
				$scope.queries = [];
				$location.path('/search');
				polysentApi.search($scope.searchInput.query, $scope.currentQueryPage, $scope.queries_per_page).then(function(response){
					$scope.queries = response.data.docs;
					$scope.totalQueries = response.data.total;
					$scope.busyLoading = false;
				}, function(error){
					$scope.$emit('modal', {
						show: true,
						width: '480px',
						height: '330px',
						iconClass: 'icon-circle-cross',
						heading: (error.statusText) ?  error.statusText : 'Oh no!',
						subHeading: (error.data.message) ? error.data.message : 'Couldn\'t retrieve search results.',
						buttonText: 'close',
						animationClasses: ['modal__content--visible', 'modal__content--hidden'],
						buttonAction: function(){
							console.log('modal closed');
							$scope.busyLoading = false;
							$scope.$apply();
						}
					});
				});
			};

			$scope.$emit('queryFn', $scope.query);

		}]);
})();