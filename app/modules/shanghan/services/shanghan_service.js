define(['angular', '../module'], function (ng) {

  console.log("shanghan service");
  'use strict';

  ng.module('shanghan.services')
  .service('shQuery', [
    '$http',
		'$q',
    function ($http, $q) {
	    var chapter;
	    var items = [];
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
				    return data;
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

	    var reset = function (){
		    chapter = null;
		    items = [];
	    };

	    return {
		    getTitle: getTitle,
		    getHerb: getHerb,
		    getWeight: getWeight,
		    getItem: getItem,
		    getRecipe: getRecipe,
		    formatRecipe: formatRecipe,
		    reset: reset,
		    getResult: function (){
			    return { chapter: chapter, items: items};
		    }
	    };
    }
  ]);
});
