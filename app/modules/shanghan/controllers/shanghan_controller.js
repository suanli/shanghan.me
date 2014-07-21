 define(['angular', 'angularBootstrap', '../module'], function (ng) {
  console.log("shanghan controller");
  'use strict';

  ng.module('shanghan.controllers')
    .controller('mainItemController', [
      '$scope',
      '$q',
      'shQuery',
      function ($scope, $q, shQuery) {
        $scope.status = {
          currentVol: 1,
          currentCapter: 0,
          showContent: false
        };
        $scope.changeChapter = function(vol, capter) {
          console.log('Page changed to: ' + vol +"," + capter);
          $scope.status.currentVol = vol;
          $scope.status.currentCapter = capter;
          $scope.status.showContent = false;
          shReload();
        };
        $scope.clickContentBtn = function (){
          $scope.status.showContent = !$scope.status.showContent;
        };

        var shReload = function (){
          shQuery.reset();
          shQuery.getTitle($scope.status.currentVol)
            .then(function (data){
              var promiseArray = [];
              for(var i = data.capterRange[$scope.status.currentCapter].start;
                  i< data.capterRange[$scope.status.currentCapter].end;
                  i++){
                promiseArray.push(shQuery.getItem($scope.status.currentVol, i))
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
			
			// Prevent dup in ng-repeate
                        for(var i = 0; i < $scope.chapter.capterRange[$scope.status.currentCapter].start; i ++){
                          $scope.items[i] = {index: i};
                        }
                        console.log(JSON.stringify($scope.items, 0, 2));
                      });
                  }
                  else
                  {
                    $scope.chapter = ret.chapter;
                    $scope.items = ret.items;
		    
		    // Prevent dup in ng-repeate
                    for(var i = 0; i < $scope.chapter.capterRange[$scope.status.currentCapter].start; i ++){
                      $scope.items[i] = {index: i};
                    }
                    console.log(JSON.stringify($scope.items, 0, 2));
                  }
                });
            });
        };

        shQuery.getContent().
          then(function (data){
            $scope.content = data;
          });

        shReload();
      }]);
});
