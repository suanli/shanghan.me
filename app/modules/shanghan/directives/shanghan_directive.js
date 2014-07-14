define(['angular', '../module'], function (ng) {
	console.log("shanghan directive");
	'use strict';

	ng.module('shanghan.directives')
		.constant('templateConfig', {
			path: "modules/shanghan/template/"
		})
		.directive('shTextContainer', function (templateConfig) {
			console.log("shanghan directive shTextContainer");
			function link(scope, element, attrs) {
				console.log("shanghan directive shTextContainer link");
				var height = $(window).height() - 50;
				element.css('height',height+'px');
				$(window).resize(function() {
					var height = $(window).height() - 50;
					element.css('height',height+'px');
				})
			}

			return {
				restrict: 'C',
				link: link

			};
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
		])
		.directive('shItem', ['templateConfig', function (templateConfig) {
			console.log("shanghan directive shItem");
			return {
				restrict: 'E',
				templateUrl: templateConfig.path + 'item.html',
				scope: {
					item: '='
				}
			};
		}
		]);

});