define(function (require) {
    
    'use strict';
    
    var angular = require('angular'),
        config = require('config'),
        dashboardModule = angular.module('app.dashboard.module', ['app.config']);
    
    dashboardModule.controller('dashboardController', require('modules/dashboard/controllers/dashboard.controller'));
    dashboardModule.controller('menuController', require('modules/dashboard/controllers/menu.controller'));

    dashboardModule.directive('menu', require('modules/dashboard/directives/dashboard.menu.directive'));
    dashboardModule.directive('search', require('modules/dashboard/directives/dashboard.search.directive'));

    dashboardModule.factory('homeService', require('modules/dashboard/services/dashboard.service'));
    dashboardModule.factory('snService', require('modules/dashboard/services/socialNetworking.service'));
        
    return dashboardModule;

});