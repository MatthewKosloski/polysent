(function(){
    'use strict';
    angular.module('directives')
    .directive('categoryValidation', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attributes, controller) {
                controller.$validators.category = function(modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                      // consider empty models to be valid
                      return true;
                    }

                    if (viewValue !== 'choose a category') {
                      // it is valid
                      return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    });
})();
