define(function(require){

    'use strict';

    // this filter will provide app related information
    return ['CONFIG', function(CONFIG) {
        return function(input, param) {
            return CONFIG.APP_INFO["APP_"+param.toUpperCase()];
        };
    }];
});