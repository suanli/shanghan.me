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
	  angular_bootstrap: '../components/angular-ui-bootstrap/dist/ui-bootstrap-0.10.0'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
	  angular_bootstrap: {
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

require([
  'angular',
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'http-auth-interceptor',
  'bootstrap',
	'angular_bootstrap',

  // Init
  'application',

], function (angular) {
  'use strict';

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
  });
});
