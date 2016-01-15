(function(){
    'use strict';
    angular.module('directives')
    .directive('pageHeader', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/directives/page-header.html',
            scope: {
                title: '@',
                row: '@'
            }
        };
    });
})();