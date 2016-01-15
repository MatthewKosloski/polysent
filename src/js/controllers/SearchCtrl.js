(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('SearchCtrl', ['$scope', 'Query', function($scope, Query){
			$scope.changePage = function(){
				if($scope.busyLoading) return;
				$scope.busyLoading = true;
				$scope.queries = [];
				Query.get($scope.searchInput, $scope.currentQueryPage, $scope.queries_per_page).then(function(response){
					$scope.queries = response.data.docs;
					$scope.busyLoading = false;
				});
			};
		}]);
})();