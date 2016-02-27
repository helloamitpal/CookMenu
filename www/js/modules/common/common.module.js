define(function (require) {
    
    'use strict';
    
    var angular = require('angular'),
        config = require('config'),
        commonModule = angular.module('app.common.module', ['app.config']);
    
    commonModule.factory('commonService', require('modules/common/services/common.common.service'));
    commonModule.provider('localeService', require('modules/common/services/common.locale.service'));
    commonModule.service('appStore', require('modules/common/services/common.storage.service'));

    commonModule.filter('capitalize', require('modules/common/filters/common.capitalize.filter'));
    commonModule.filter('appInfo', require('modules/common/filters/common.appInfo.filter'));

    commonModule.directive('fallbackImage', require('modules/common/directives/common.fallback.image.directive'));
    commonModule.directive('toasterMsg', require('modules/common/directives/common.toaster.directive'));
    commonModule.directive('inputValidator', require('modules/common/directives/common.input.validator.directive'));

    commonModule.factory('errorsInterceptor', require('modules/common/services/error.handler.service'));

    return commonModule;

});