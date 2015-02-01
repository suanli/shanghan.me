define(['angular', '../module'], function (ng) {

  'use strict';

  ng.module('shanghan.services')
  .service('shQuery', [
    '$http',
		'$q',
    function ($http, $q) {
	    var chapter;
      var content;
	    var items;
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

      var getChapter = function(vol, chapter) {
        return get('http://api.shanghan.me/dsh/text?vol='+vol+'&chapter='+chapter)
          .then(function (data){
            items = data;
          });
      }

	    var getHerb = function (){
		    if(herb)
		    {
			    var q = $q.defer();
			    q.resolve();
			    return q.promise;
		    }
		    return get('http://api.shanghan.me/dsh/herb')
			    .then(function (data){
				    herb = data[0].text;
			    });
	    };

	    var getWeight = function (){
		    if(weight)
		    {
			    var q = $q.defer();
			    q.resolve();
			    return q.promise;
		    }
		    return get('http://api.shanghan.me/dsh/weight')
			    .then(function (data){
				    weight = data[0].text;
			    });
	    };

	    var getRecipe = function (name){
		    if(recipes[name])
		    {
			    var q = $q.defer();
			    q.resolve();
			    return q.promise;
		    }
		    return get('http://api.shanghan.me/dsh/recipe?index=' + name)
			    .then(function (data){
				    recipes[name] = data[0];
			    });
	    };

      var getContent = function (){
        return get('http://api.shanghan.me/dsh/content/')
          .then(function (data){
            content = data;
            return data;
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
		    getHerb: getHerb,
		    getWeight: getWeight,
        getChapter: getChapter,
		    getRecipe: getRecipe,
		    formatRecipe: formatRecipe,
        getContent: getContent,
		    reset: reset,
		    getResult: function (){
			    return { items: items, content: content};
		    }
	    };
    }
  ]);
});
