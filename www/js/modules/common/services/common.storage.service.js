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
            obj[key] = val;
            localStorage.setItem("cookMenuApp", JSON.stringify(obj));
        }

        function getFromLocal(key) {
            var obj = __getLocalObj();
            return ((obj && obj[key]) ? obj[key] : "");
        }

        function removeFromLocal(key) {
            var obj = __getLocalObj();
            if(obj && obj[key]) {
                delete obj[key];
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