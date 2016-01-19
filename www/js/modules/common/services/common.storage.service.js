define(function(require){
    'use strict';

    function AppStorage() {
        var __obj = {};

        return {
            getFromAppStore: function(key) {
                return __obj[key];
            },
            setToAppStore: function(key, val) {
                __obj[key] = val;
            }
        }

    }

    return AppStorage;
});