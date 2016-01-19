define(function (require) {
    
    'use strict';
    
    var angular = require('angular'),
        config = require('config'),
        loginModule = angular.module('app.login.module', ['app.config']);
    
    loginModule.controller('loginController', require('modules/login/controllers/login.controller'));
    
    return loginModule;

});