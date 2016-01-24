(function(){
	'use strict';
	angular
		.module('directives')
		.directive('modal', [function() {
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

					var cta = element.find('.modal__cta'),
			      		modalContent = element.find('.modal__content');

					scope.hideModal = function(){
						scope.show = false;
			      	};

			      	cta.bind('click', function(){
			      		var buttonAction = scope.buttonAction();
			      		buttonAction();
			      		scope.hideModal();
			      	});
				}
			};
		}]);
})();