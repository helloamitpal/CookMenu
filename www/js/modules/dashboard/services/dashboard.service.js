define(function () {
    "use strict";

    var factory = function ($rootScope, $http, $q, CONFIG, $state, $ionicLoading, appStore) {

        function titleClickListener() {
            $(document).on("click", "#navBar .title", function(evt) {
                evt.stopImmediatePropagation();
                $rootScope.showSearch = true;
            });
        }

        function getSpecialRecipeList() {
            var def = $q.defer(), obj, arr = [];

            $http.get(CONFIG.SERVICE_URL.SPECIAL_RECIPE).success(function(data) {
                var savedRecipes = appStore.getFromLocal("savedRecipes");

                for(var index=0, len=data.length; index<len; index++){
                    obj = data[index];
                    obj.isSaved = (savedRecipes && savedRecipes.hasOwnProperty("savedItems_"+obj._id));
                    arr.push(obj);
                }
                def.resolve(arr || []);
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
                def.reject([]);
            });

            return def.promise;
        }

        return {
            titleClickListener: titleClickListener,
            getRecipeList: getRecipeList,
            getSpecialRecipeList: getSpecialRecipeList,
            getSavedRecipes: getSavedRecipes
        };

    };

    factory.$inject = ['$rootScope', '$http', '$q', 'CONFIG','$state', '$ionicLoading', 'appStore'];
    return factory;
});