(function(){
	'use strict';
	angular
		.module('directives')
		.directive('modal', ['$document', function($document) {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'templates/directives/modal.html',
				scope: {
					show: '=',
					width: '=',
					height: '=',
					iconClass: '=',
					heading: '=',
					subHeading: '=',
					buttonText: '=',
					animationClasses: '=',
					buttonAction: '&'
				},
				link: function(scope, element, attr, Ctrl) {

					scope.hideModal = function(){
						scope.show = false;
			      	};

					var cta = angular.element($document[0].querySelector('.modal__cta'));
			      	cta.bind('click', function(){
			      		var buttonAction = scope.buttonAction();
			      		buttonAction();
			      	});
				}
			};
		}]);
})();