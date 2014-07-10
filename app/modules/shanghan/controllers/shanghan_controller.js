define(['angular', 'ui.bootstrap', '../module'], function (ng) {
  console.log("shanghan controller");
  'use strict';

	ng.module('shanghan.controllers')
		.controller('mainItemController', [
			'$scope',
			'$q',
			'shQuery',
			function ($scope, $q, shQuery) {
				$scope.itemsPerPage = 1;
				$scope.totalItems = 16;
				$scope.currentPage = 1;
				$scope.pageChanged = function() {
					console.log('Page changed to: ' + $scope.currentPage);
					shReload();
				};
				var shReload = function (){
					shQuery.reset();
					shQuery.getTitle($scope.currentPage)
						.then(function (data){
							var promiseArray = [];
							for(var i = data.capterRange[0].start; i< data.capterRange[0].end; i++){
								promiseArray.push(shQuery.getItem($scope.currentPage, i))
							}
							promiseArray.push(shQuery.getHerb());
							promiseArray.push(shQuery.getWeight());
							$q.all(promiseArray)
								.then(function (){
									var ret = shQuery.getResult();
									var promiseArray = [];

									for(var i in ret.items)
									{
										if(ret.items[i].recipe){
											for(var r in ret.items[i].recipe){
												promiseArray.push(shQuery.getRecipe(ret.items[i].recipe[r]));
											}
										}
									}
									if(promiseArray.length > 0){
										$q.all(promiseArray)
											.then(function (){
												// Format recipe.
												shQuery.formatRecipe();
												$scope.chapter = ret.chapter;
												$scope.items = ret.items;
											});
									}
									else
									{
										$scope.chapter = ret.chapter;
										$scope.items = ret.items;
									}
								});
						});
				};
				shReload();
			}]);
});
