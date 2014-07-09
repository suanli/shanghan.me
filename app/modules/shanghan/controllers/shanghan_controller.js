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
				$scope.totalItems = 17;
				$scope.currentPage = 1;
				$scope.pageChanged = function() {
					console.log('Page changed to: ' + $scope.currentPage);
				};
				$q.all([
						shQuery.getTitle(6),
						shQuery.getItem(6, 12),
						shQuery.getItem(6, 13),
						shQuery.getItem(6, 14),
						shQuery.getItem(6, 15),
						shQuery.getItem(6, 16),
						shQuery.getItem(6, 17),
						shQuery.getItem(6, 18),
						shQuery.getItem(6, 19),
						shQuery.getItem(6, 20),
						shQuery.getItem(6, 21),
						shQuery.getItem(6, 22),
						shQuery.getItem(6, 23),
						shQuery.getHerb(),
						shQuery.getWeight()
					])
					.then(function (){
							$q.all([
									shQuery.getRecipe(shQuery.getResult().items[13].recipe)
								])
								.then(function (){
									// Format recipe.
									shQuery.formatRecipe();
									$scope.chapter = shQuery.getResult().chapter;
									$scope.items = shQuery.getResult().items;
								})
					});
			}
		]
	);
});
