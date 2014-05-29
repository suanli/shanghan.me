define(['angular', '../module'], function (ng) {
  console.log("shanghan controller");
  'use strict';

	ng.module('shanghan.controllers')
		.filter('partition',  function() {
			var cache = {};
			var filter = function(arr, size) {
				if (!arr) { return; }
				var newArr = [];
				for (var i=0; i<arr.length; i+=size) {
					newArr.push(arr.slice(i, i+size));
				}
				var arrString = JSON.stringify(arr);
				var fromCache = cache[arrString+size];
				if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
					return fromCache;
				}
				cache[arrString+size] = newArr;
				return newArr;
			};
			return filter;
		});

	ng.module('shanghan.controllers')
		.controller('mainItemController', [
			'$scope',
			'$http',
			function ($scope, $http) {
				$scope.items = new Array();
				$http.get('modules/shanghan/data/shlglb/ch06/title.json').success(function(data) {
					$scope.chapter = data;
				});

				$http.get('modules/shanghan/data/shlglb/ch06/13.json').success(function(data) {
					$scope.items.push(data);
				});
				$http.get('modules/shanghan/data/shlglb/ch06/12.json').success(function(data) {
					$scope.items.push(data);
				});
			}
		]
	);
});
