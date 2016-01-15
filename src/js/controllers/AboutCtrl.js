(function(){
	'use strict';
	angular
		.module('controllers')
		.controller('AboutCtrl', ['$scope', function($scope){
			$scope.stats = {polls: 0, visitors: 0, upvotes: 0};
		}]);
})();