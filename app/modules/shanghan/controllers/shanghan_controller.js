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

				$scope.chapter = httpGet.get('modules/shanghan/data/shlglb/ch06/title.json')
					.then(function(data) {
					$scope.chapter = data;
				});

				var itemText = null;
				httpGet.get('modules/shanghan/data/shlglb/ch06/13.json')
					.then(function (data) {
						itemText = data;
						return httpGet.get('modules/shanghan/data/shlglb/recipe/' + itemText.recipe + '.json');
					}).then(function (recipe) {
						itemText.recipe = recipe;
						return httpGet.get('modules/shanghan/data/shlglb/herb/herb.json');
					}).then(function (herb) {
						itemText.herb = herb;
						return httpGet.get('modules/shanghan/data/shlglb/herb/weight.json');
					}).then(function (weight) {
						itemText.weight = weight;
						for(var a = 0; a < itemText.recipe.items.length; a++)
						{
							itemText.recipe.items[a].herb = itemText.herb[itemText.recipe.items[a].herb].name;
							itemText.recipe.items[a].weight = itemText.weight[itemText.recipe.items[a].weight].handai;
						}
						$scope.items.push(itemText);
					});

				httpGet.get('modules/shanghan/data/shlglb/ch06/12.json')
					.then(function(data) {
					$scope.items.push(data);
				});
			}
		]
	);
});
