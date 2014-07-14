/**
 * @file This is a require.js main.js file, use it to specify all the javascript files you need for your module.
 */
define([
  'jquery',
  'angular',
	'bootstrap',
	'angularBootstrap',
  './services/shanghan_service',
  './directives/shanghan_directive',
  //'./factories/shanghan_factory',
  './controllers/shanghan_controller',
	'./filters/shanghan_filter',
  './module'

], function() {
  console.log("FrontEnd_shanghan Main.js");
});
