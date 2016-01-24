(function(){
	'use strict';
	angular
		.module('services')
		.factory('localStorage', ['localStorageService', function(localStorageService){
		
			var factory = {};
			
			factory.setItem = function(key, val) {
				return localStorageService.set(key, val);
			};

			factory.getItem = function(key) {
				return localStorageService.get(key);
			};

			factory.getArray = function(arrayName) {
				var thisArray = [];
				var fetchArrayObject = factory.getItem(arrayName);
				if (typeof fetchArrayObject !== 'undefined') {
					if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
				}
				return thisArray;
			};

			factory.pushArrayItem = function(arrayName, arrayItem) {
				var existingArray = factory.getArray(arrayName);
				existingArray.push(arrayItem);
				factory.setItem(arrayName,JSON.stringify(existingArray));
			};

			// Removes the last element from an array and returns that element. 
			factory.popArrayItem = function(arrayName) { 
				var arrayItem = {};
				var existingArray = factory.getArray(arrayName);
				if (existingArray.length > 0) {
					arrayItem = existingArray.pop();
					factory.setItem(arrayName,JSON.stringify(existingArray));
				}
				return arrayItem;
			};

			// Removes the first element from an array and returns that element.
			factory.shiftArrayItem = function(arrayName) {
				var arrayItem = {};
				var existingArray = factory.getArray(arrayName);
				if (existingArray.length > 0) {
					arrayItem = existingArray.shift();
					factory.setItem(arrayName,JSON.stringify(existingArray));
				}
				return arrayItem;
			};

			// Adds one or more elements to the beginning of an array and returns the new length of the array.
			factory.unshiftArrayItem = function(arrayName,arrayItem) {
				var existingArray = factory.getArray(arrayName);
				existingArray.unshift(arrayItem);
				factory.setItem(arrayName,JSON.stringify(existingArray));
			};
			return factory;
		}]);
})();