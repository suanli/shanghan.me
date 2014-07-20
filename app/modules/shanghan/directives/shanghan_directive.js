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
        element.css('height', height + 'px');
        $(window).resize(function () {
          var height = $(window).height() - 50;
          element.css('height', height + 'px');
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
    }])
    .directive('shItemText', ['templateConfig', function (templateConfig) {
      console.log("shanghan directive shComments");
      function link(scope, element, attrs) {
        console.log("shanghan directive shComments link");

        scope.textBlock = [];
        if(!scope.comments)
        {
          scope.textBlock[0] = {};
          scope.textBlock[0].text = scope.text;
          return;
        }
        var lastPosition = 0;
        for(var i in scope.comments){
          scope.textBlock[i] = {};
          scope.textBlock[i].text = scope.text.slice(lastPosition, scope.comments[i].position);
          scope.textBlock[i].comment = scope.comments[i].comment;
          lastPosition = scope.comments[i].position;
        }
        scope.textBlock[scope.textBlock.length] = {};
        scope.textBlock[scope.textBlock.length-1].text = scope.text.slice(lastPosition);
      }
      return {
        restrict: 'C',
        templateUrl: templateConfig.path + 'itemText.html',
        scope: {
          text: '=',
          comments: '='
        },
        link: link
      };
    }])
    .directive('shItem', ['templateConfig', function (templateConfig) {
      console.log("shanghan directive shItem");
      return {
        restrict: 'E',
        templateUrl: templateConfig.path + 'item.html',
        scope: {
          item: '='
        }
      };
    }]);

});