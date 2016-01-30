define(function () {
    "use strict";

    var factory = function ($rootScope, $http, $q, CONFIG, $state, $ionicLoading) {

        function titleClickListener() {
            $(document).on("click", "#navBar .title", function(evt) {
                evt.stopImmediatePropagation();
                $rootScope.showSearch = true;
            });
        }

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

        function addToFavorite(evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            var $ele = $(evt.currentTarget);
            if($ele.hasClass("favorite-item")) {
                $ele.removeClass("favorite-item");
            } else {
                $ele.addClass("favorite-item");
            }
        }

        return {
            titleClickListener: titleClickListener,
            getRecipeList: getRecipeList,
            addToFavorite: addToFavorite,
            getSpecialRecipeList: getSpecialRecipeList
        };

    };

    factory.$inject = ['$rootScope', '$http', '$q', 'CONFIG','$state', '$ionicLoading'];
    return factory;
});