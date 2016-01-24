(function(){
    'use strict';
    angular
        .module('filters')
        .filter('unslugify', [function() {
            return function(str, chars) {
                var arr = str.split(new RegExp('['+chars+']'));
                for(var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].replace(arr[i].slice(0, 1), arr[i].slice(0, 1).toUpperCase());
                }
                return arr.join(' ');
            };
        }]);
})();