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
          vol: 4,
          chapter: 1,
          volTitle: null,
          chapterTitle: null,
          showContent: false
        };
        $scope.changeChapter = function(vol, capter) {
          console.log('Page changed to: ' + vol +"," + capter);
          $scope.status.vol = vol;
          $scope.status.chapter = capter;
          $scope.status.showContent = false;
          shReload();
        };
        $scope.clickContentBtn = function (){
          $scope.status.showContent = !$scope.status.showContent;
        };

        var getChapterTitle = function(vol, chapter, content){
          vol --;
          chapter --;
          if(vol < content.length)
          {
            if(chapter < content[vol].chapters.length)
              return content[vol].chapters[chapter].title
          }
          return null;
        }

        var getVolTitle = function(vol, content){
          vol --;
          if(vol < content.length)
          {
            return content[vol].title
          }
          return null;
        }

        var shReload = function (){
          shQuery.reset();
          shQuery.getContent()
            .then(function (){
              var promiseArray = [];
              promiseArray.push(shQuery.getChapter($scope.status.vol, $scope.status.chapter));
              promiseArray.push(shQuery.getHerb());
              promiseArray.push(shQuery.getWeight());
              $q.all(promiseArray)
                .then(function (){
                  var ret = shQuery.getResult();
                  $scope.content = ret.content;
                  $scope.status.volTitle = getVolTitle($scope.status.vol, ret.content);
                  $scope.status.chapterTitle = getChapterTitle($scope.status.vol, $scope.status.chapter, ret.content);

                  console.log($scope.status.volTitle);
                  console.log($scope.status.chapterTitle);
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
                        $scope.items = ret.items;
                      });
                  }
                  else
                  {
                    $scope.items = ret.items;
                  }
                });
            });
        };
        shReload();
      }]);
});
