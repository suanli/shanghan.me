define(['angular', '../module'], function (ng) {
  console.log("frontend_example directive");
  'use strict';

  ng.module('shanghan.directives')
  .directive('SSDirective', function() {
    var link = function($scope, $element, $attrs, ctrl) {
      console.log( 'Shanghan Directive' );
    };

    return {
      require: 'ngModel',
      link: link
    };

  });

});