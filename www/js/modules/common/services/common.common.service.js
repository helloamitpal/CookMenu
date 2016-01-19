define(['angular'], function (angular) {
    "use strict";

    var factory = function ($http, $q, CONFIG) {
        
        function getMenu() {
            var def = $q.defer();
            $http.get(CONFIG.SERVICE_URL.MENU).success(function(data) {
                def.resolve(data.menu || []);
            }).error(function(err) {
                console.log("some error occurred in menu json loading");
                def.resolve([]);
            });
            return def.promise;
        }
        
        return {
            getMenu: getMenu
        };

    };

    factory.$inject = ['$http', '$q', 'CONFIG'];
    return factory;
});