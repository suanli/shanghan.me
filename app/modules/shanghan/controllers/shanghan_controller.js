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
			function ($scope) {
				$scope.items = {
					'title': '太阳病辨脉并治上',
					'text': '太陽中風，陽浮而陰弱。陽浮者，熱自發；陰弱者，汗自出。嗇嗇惡	寒，淅淅惡風，翕翕發熱，鼻鳴乾嘔者，桂枝湯主之。',
					'recipe': {
						'title': '桂枝湯方',
						'items':[
							{
								'herb': '桂枝',
								'weight': '三两',
								'comment': '去皮'
							},
							{
								'herb': '芍藥',
								'weight': '三两'
							},
							{
								'herb': '甘草',
								'weight': '二两',
								'comment': '炙'
							},
							{
								'herb': '生薑',
								'weight': '三两',
								'comment': '切'
							},
							{
								'herb': '大棗',
								'weight': '十二枚',
								'comment': '劈'
							}
						],
						'comment': '右五味，㕮咀，以水七升，微火煮取三升，去滓。適寒溫，服一升，服已須臾，啜熱稀粥一升餘，以助藥力。溫覆令一時許，遍身漐漐微似有汗者益佳，不可令如水流漓，病必不除。若一服汗出，病差，停後服，不必盡劑。若不汗，更服依前法。又不汗，後服小促其間，半日許，令三服盡。若病重者，一日一夜服，周時觀之。服一劑盡，病證猶在者，更作服。若汗不出，乃服至二三劑。禁生冷、粘滑、肉麵、五辛、酒酪、臭惡等物。'
					}
				};
			}
		]);


});
