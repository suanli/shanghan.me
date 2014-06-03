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
		.factory('httpGet',
			function($http, $q)
			{
				var get = function(url) {
					var deferred = $q.defer();
					$http.get(url).success(function(data) {
						deferred.resolve(data);
					});
					// TODO: Error case?
					return deferred.promise;
				};

				return {
					get: get
				};

			});

	ng.module('shanghan.controllers')
		.controller('mainItemController', [
			'$scope',
			'httpGet',
			function ($scope, httpGet) {
				//TODO: Refactor for better writing logic.
				$scope.items = new Array();

				$scope.chapter = httpGet.get('modules/shanghan/data/shlglb/ch06/title.json').then(function(data) {
					$scope.chapter = data;
				});

				httpGet.get('modules/shanghan/data/shlglb/ch06/13.json').then(function(data) {
					$scope.items.push(data);
				});
				
				httpGet.get('modules/shanghan/data/shlglb/ch06/12.json').then(function(data) {
					$scope.items.push(data);
				});
			}
		]
	);
});
