(function(){
    'use strict';
    angular.module('directives')
    .directive('searchIcon', ['classes', function(classes) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/directives/search-icon.html',
            link: function(scope, element, attributes) {
                element.on('click', function(){
                    var searchBarContainer = $('.search-bar-container'),
                        cls = classes.searchBar.visible;
                    
                    if(searchBarContainer.hasClass(cls)) {
                        element.css({'opacity': 0.75});
                    } else {
                        element.css({'opacity': 1});
                    }

                    searchBarContainer.toggleClass(cls);
                });
            }
        };
    }]);
})();