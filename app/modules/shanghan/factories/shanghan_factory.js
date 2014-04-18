define(['angular', '../module'], function (ng) {
  console.log("shanghan factory");
  'use strict';

  ng.module('shanghan.factories')
  .factory('SSFactory', function(){
      return {
          sayHello: function(text){
              return "Shanghan Factory says \"Hello " + text + "\"";
          }  
      }               
  });

});