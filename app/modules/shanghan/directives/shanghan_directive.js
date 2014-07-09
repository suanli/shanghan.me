define(['angular', '../module'], function (ng) {
	console.log("shanghan directive");
	'use strict';

	ng.module('shanghan.directives')
		.constant('templateConfig', {
			path: "modules/shanghan/template/"
		})
		.directive('shHerb', ['templateConfig', function (templateConfig) {
			console.log("shanghan directive shHerb");
			return {
				restrict: 'E',
				templateUrl: templateConfig.path + 'herb.html',
				scope: {
					herb: '='
				}
				};
			}
		])
	.directive('shRecipe', ['templateConfig', function (templateConfig) {
		console.log("shanghan directive shRecipe");
		return {
			restrict: 'E',
			templateUrl: templateConfig.path + 'recipe.html',
			scope: {
				recipe: '='
			}
		};
	}
	]);

});