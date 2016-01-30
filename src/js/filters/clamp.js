(function(){
    'use strict';
    angular
        .module('filters')
        .filter('clamp', [function() {
            return function(element, num) {
                if (element.length < num) return element; 
                var newText = element.slice(0, num),
                    len = newText.length,
                    isSpace = (newText.slice(len - 3, len - 2) === ' '),
                    offset = isSpace ? 3 : 2;
                return newText.slice(0, len - offset) + '...';
            };
        }]);
})();