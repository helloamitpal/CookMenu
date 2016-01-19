define(function (require) {
    
    'use strict';
    
    var angular = require('angular'),
        config = require('config'),
        commonModule = angular.module('app.common.module', ['app.config']);
    
    commonModule.factory('commonService', require('modules/common/services/common.common.service'));
    commonModule.provider('localeService', require('modules/common/services/common.locale.service'));
    commonModule.service('appStore', require('modules/common/services/common.storage.service'));
    commonModule.filter('capitalize', require('modules/common/filters/common.filter'));
    
    return commonModule;

});