(function(){
    'use strict';
    angular.module('directives')
    .directive('stat', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/directives/stat.html',
            scope: {
                number: '@',
                title: '@'
            }
        };
    });
})();