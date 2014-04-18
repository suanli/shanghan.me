/**
 * @file Instantiates and configures angular modules for your module.
 */
define(['angular'], function (ng) {
  console.log("shanghan module.js");
  'use strict';

  ng.module('shanghan.controllers', []);
  ng.module('shanghan.providers', []);
  ng.module('shanghan.services', []);
  ng.module('shanghan.factories', []);
  ng.module('shanghan.directives', []);

  var module = ng.module('shanghan', [
    'cs_common',
    'shanghan.controllers',
    'shanghan.providers',
    'shanghan.services',
    'shanghan.factories',
    'shanghan.directives'
  ]);

  module.config([
    '$routeProvider',
    'CSTemplateProvider',
    function ($routeProvider, CSTemplate) {

      // Set the subfolder of your module that contains all your view templates.
      CSTemplate.setPath('/modules/shanghan/views');

      // Register any routes you need for your module.
      $routeProvider
        .when('/shanghan', {
          templateUrl: CSTemplate.view('shanghan-view'),
          controller: 'SSController',
          public: true
        });
    }

  ]);

  return module;
});
