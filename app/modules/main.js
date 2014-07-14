require.config({
  baseUrl: 'modules',
  packages: [
    'application',
    'cs_account',
    'cs_common',
    'cs_session',
    'users',
    'shanghan'
  ],
  paths: {
    angular: '../components/angular/angular',
    jquery: '../components/jquery/jquery',
    underscore: '../components/underscore/underscore',
    ngCookies: '../components/angular-cookies/angular-cookies',
    ngResource: '../components/angular-resource/angular-resource',
    ngRoute: '../components/angular-route/angular-route',
    ngSanitize: '../components/angular-sanitize/angular-sanitize',
    'http-auth-interceptor': '../components/angular-http-auth/src/http-auth-interceptor',
    bootstrap: '../scripts/bootstrap',
    angularBootstrap: '../components/angular-bootstrap/ui-bootstrap'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
	  angularBootstrap: {
		  deps: ['angular']
	  },
    ngCookies: {
      deps: ['angular']
    },
    ngResource: {
      deps: ['angular']
    },
    ngRoute: {
      deps: ['angular']
    },
    ngSanitize: {
      deps: ['angular']
    },
    'http-auth-interceptor': {
      deps: ['angular']
    },
    bootstrap: {
      deps: ['jquery']
    },
    underscore: {
      exports: '_'
    }
  }
});
requirejs
require([
  'angular',
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'http-auth-interceptor',
  'bootstrap',
	'angularBootstrap',

  // Init
  'application'

], function (angular) {
  'use strict';

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
  });
});
