define(function () {
    "use strict";

    factory.$inject = ['$http', '$q', 'CONFIG','$state', '$ionicLoading'];

    function factory($http, $q, CONFIG, $state, $ionicLoading) {

        function getSpecialRecipeList() {
            var def = $q.defer();

            $http.get(CONFIG.SERVICE_URL.SPECIAL_RECIPE).success(function(data) {
                def.resolve(data || []);
            }).error(function(err) {
                console.log("some error occurred in special recipe json loading"+err);
                def.resolve([]);
            });
            return def.promise;
        }

        function getRecipeList() {
            var def = $q.defer();

            $ionicLoading.show();
            $http.get(CONFIG.SERVICE_URL.ALL_CATEGORIZED_RECIPE+"/"+CONFIG.INIT_CATEGORY_COUNT+"/"+CONFIG.INIT_DYNAMIC_RECIPE_COUNT).success(function(data) {
                $ionicLoading.hide();
                def.resolve(data || []);
            }).error(function(err) {
                $ionicLoading.hide();
                console.log("some error occurred in recipe json loading"+err);
                def.resolve([]);
            });
            return def.promise;
        }

        function getSavedRecipes(userId) {
            var def = $q.defer();

            $http.get(CONFIG.SERVICE_URL.ALL_SAVED_RECIPES+"/"+userId).success(function(data) {
                def.resolve(data);
            }).error(function(err) {
                console.log("error in fetching saved recipes"+err);
                def.resolve([]);
            });

            return def.promise;
        }

        return {
            getRecipeList: getRecipeList,
            getSpecialRecipeList: getSpecialRecipeList,
            getSavedRecipes: getSavedRecipes
        };

    };

    return factory;
});