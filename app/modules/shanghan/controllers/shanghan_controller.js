define(['angular', '../module'], function (ng) {
  console.log("shanghan controller");
  'use strict';

  ng.module('shanghan.controllers')
  .controller('SSController', [
    '$scope',
    function ($scope) {
      $scope.something = 'Shanghan Module';
    }

  ]);

});
