define(['angular', 'ui.bootstrap', '../module'], function (ng) {
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
		.factory('dshQuery',
			function($http, $q)
			{
				var chapter;
				var items = {};
				var herb;
				var weight;
				var recipes = {};

				var get = function(url) {
					var deferred = $q.defer();
					$http.get(url).success(function(data) {
						deferred.resolve(data);
					});
					// TODO: Error case?
					return deferred.promise;
				};

				var getTitle = function (index){
					if(chapter && chapter[index] == index)
					{
						var q = $q.defer();
						q.resolve();
						return q.promise;
					}
					return get('modules/shanghan/data/glgbshl/vol'+index+'/title.json')
						.then(function (data){
							chapter = data;
						});
				};

				var getItem = function (chapter, index){
					if(items[index] && items[index].chapter == chapter)
					{
						var q = $q.defer();
						q.resolve();
						return q.promise;
					}
					return get('modules/shanghan/data/glgbshl/vol'+chapter+'/'+index+'.json')
						.then(function (data){
							items[index] = data;
						});
				};

				var getHerb = function (){
					if(herb)
					{
						var q = $q.defer();
						q.resolve();
						return q.promise;
					}
					return get('modules/shanghan/data/glgbshl/herb/herbs.json')
						.then(function (data){
							herb = data;
						});
				};

				var getWeight = function (){
					if(weight)
					{
						var q = $q.defer();
						q.resolve();
						return q.promise;
					}
					return get('modules/shanghan/data/glgbshl/herb/weights.json')
						.then(function (data){
							weight = data;
						});
				};

				var getRecipe = function (name){
					if(recipes[name])
					{
						var q = $q.defer();
						q.resolve();
						return q.promise;
					}
					return get('modules/shanghan/data/glgbshl/recipe/' + name + '.json')
						.then(function (data){
							recipes[name] = data;
						});
				};

				var formatRecipe = function (){
					for(var i in items)
					{
						var item = items[i];
						if(item.recipe){
							for(var o in item.recipe)
							{
								if(recipes[item.recipe[o]]){
									item.recipe[o] = recipes[item.recipe[o]];
									for(var j in item.recipe[o].herbs)
									{
										var h = item.recipe[o].herbs[j];
										if(herb[h.herb]){
											h.herb = herb[h.herb];
										} else{
											// Error case, not this herb.
										}
										if(weight[h.weight]){
											h.weight = weight[h.weight];
										} else{
											// Error case, not this herb.
										}
									}
								} else{
										//Error case, not get recipe yet.
								}
							}
						}
					}
				};

				return {
					getTitle: getTitle,
					getHerb: getHerb,
					getWeight: getWeight,
					getItem: getItem,
					getRecipe: getRecipe,
					formatRecipe: formatRecipe,
					getResult: function (){
						return { chapter: chapter, items: items};
					}
				};
			}
		);

	ng.module('shanghan.controllers')
		.controller('mainItemController', [
			'$scope',
			'$q',
			'dshQuery',
			function ($scope, $q, dshQuery) {
				$scope.itemsPerPage = 1;
				$scope.totalItems = 17;
				$scope.currentPage = 1;
				$scope.pageChanged = function() {
					console.log('Page changed to: ' + $scope.currentPage);
				};
				$q.all([
						dshQuery.getTitle(6),
						dshQuery.getItem(6, 12),
						dshQuery.getItem(6, 13),
						dshQuery.getItem(6, 14),
						dshQuery.getItem(6, 15),
						dshQuery.getItem(6, 16),
						dshQuery.getItem(6, 17),
						dshQuery.getItem(6, 18),
						dshQuery.getItem(6, 19),
						dshQuery.getItem(6, 20),
						dshQuery.getItem(6, 21),
						dshQuery.getItem(6, 22),
						dshQuery.getItem(6, 23),
						dshQuery.getHerb(),
						dshQuery.getWeight()
					])
					.then(function (){
							$q.all([
									dshQuery.getRecipe(dshQuery.getResult().items[13].recipe)
								])
								.then(function (){
									// Format recipe.
									dshQuery.formatRecipe();
									$scope.chapter = dshQuery.getResult().chapter;
									$scope.items = dshQuery.getResult().items;
								})
					});
			}
		]
	);
});
