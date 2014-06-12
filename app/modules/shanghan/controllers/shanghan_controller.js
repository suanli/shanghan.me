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
					return get('modules/shanghan/data/shlglb/ch'+index+'/title.json')
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
					return get('modules/shanghan/data/shlglb/ch'+chapter+'/'+index+'.json')
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
					return get('modules/shanghan/data/shlglb/herb/herb.json')
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
					return get('modules/shanghan/data/shlglb/herb/weight.json')
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
					return get('modules/shanghan/data/shlglb/recipe/' + name + '.json')
						.then(function (data){
							recipes[name] = data;
						});
				};

				var formatRecipe = function (){
					for(var i in items)
					{
						var item = items[i];
						if(item.recipe){
							if(recipes[item.recipe]){
								item.recipe = recipes[item.recipe];
								for(var j in item.recipe.items)
								{
									var h = item.recipe.items[j];
									if(herb[h.herb]){
										h.herb = herb[h.herb].name;
									} else{
										// Error case, not this herb.
									}
									if(weight[h.weight]){
										h.weight = weight[h.weight].handai;
									} else{
										// Error case, not this herb.
									}
								}
							} else{
									//Error case, not get recipe yet.
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
					items: items,
					recipes: recipes,
					chapter: chapter
				};
			}
		);

	ng.module('shanghan.controllers')
		.controller('mainItemController', [
			'$scope',
			'$q',
			'dshQuery',
			function ($scope, $q, dshQuery) {

				$q.all([
						dshQuery.getTitle(6),
						dshQuery.getItem(6, 12),
						dshQuery.getItem(6, 13),
						dshQuery.getHerb(),
						dshQuery.getWeight()
					])
					.then(function (){
							$q.all([
									dshQuery.getRecipe(dshQuery.items[13].recipe)
								])
								.then(function (){
									// Format recipe.
									dshQuery.formatRecipe();
									$scope.chapter = dshQuery.chapter;
									$scope.items = dshQuery.items;
									console.log(dshQuery);
								})
					});
			}
		]
	);
});
