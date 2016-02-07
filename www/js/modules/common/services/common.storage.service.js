define(function(require){
    'use strict';

    function AppStorage() {
        var __obj = {};

        function __getLocalObj() {
            var objStr = localStorage.getItem("cookMenuApp");
            var obj = ((objStr) ? JSON.parse(objStr) : {});
            return obj;
        }

        function storeInLocal(key, val) {
            var obj = __getLocalObj();
            if(key.indexOf(".") > 0) {
                var setOfKeys = key.split(".");
                if(setOfKeys.length === 2) {
                    obj[setOfKeys[0]] = {};
                    obj[setOfKeys[0]][setOfKeys[1]] = val;
                }
            } else {
                obj[key] = val;
            }
            localStorage.setItem("cookMenuApp", JSON.stringify(obj));
        }

        function getFromLocal(key) {
            var val, obj = __getLocalObj();
            if(key.indexOf(".") > 0) {
                var setOfKeys = key.split(".");
                for(var index=0, len=setOfKeys.length; index<len; index++) {
                    obj = obj[setOfKeys[index]];
                }
            } else {
                obj = ((obj && obj[key]) ? obj[key] : undefined);
            }
            return obj;
        }

        function removeFromLocal(key) {
            var obj = __getLocalObj();
            if(obj) {
                if(key.indexOf(".") > 0) {
                    var setOfKeys = key.split(".");
                    if(setOfKeys.length === 2) {
                        delete obj[setOfKeys[0]][setOfKeys[1]];
                    }
                } else {
                    delete obj[key];
                }
                localStorage.setItem("cookMenuApp", JSON.stringify(obj));
            }
        }

        return {
            getFromAppStore: function(key) {
                return __obj[key];
            },
            setToAppStore: function(key, val) {
                __obj[key] = val;
            },
            storeInLocal: storeInLocal,
            getFromLocal: getFromLocal,
            removeFromLocal: removeFromLocal
        };
    }

    return AppStorage;
});