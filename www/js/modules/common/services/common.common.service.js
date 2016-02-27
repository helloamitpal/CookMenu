define(function () {
    "use strict";

    factory.$inject = ['$http', '$q', 'CONFIG', 'appStore', '$ionicLoading'];

    function factory($http, $q, CONFIG, appStore, $ionicLoading) {

        // this function is fetching menu
        function getMenu() {
            var def = $q.defer();
            $http.get(CONFIG.SERVICE_URL.MENU).success(function(data) {
                def.resolve(data || []);
            }).error(function(err) {
                console.log("some error occurred in menu json loading"+err);
                def.resolve([]);
            });
            return def.promise;
        }

        // this function determining which menu needs to be highlighted
        function highlightSelectedMenu(ele) {
            var $ele;
            if(typeof ele === "string") {
                var className = ele.split('.').join('-'), $menu = $("#menuSection");
                $ele = $("."+className, $menu);
                if($ele.length === 0 && $(".selected-menu", $menu).length === 0) {
                    $ele = $(".home-dashboard", $menu);
                }
            } else {
                $ele = $(ele);
            }
            $ele.siblings().removeClass("selected-menu");
            $ele.addClass("selected-menu");
        }

        // this is a common function for adding or removing recipe as favorite
        function addRemoveFavorite(evt, recipeObj, callback) {
            evt.preventDefault();
            evt.stopImmediatePropagation();

            var $ele = $(evt.currentTarget), savedUser = appStore.getFromLocal("userLoggedInStatus");
            var recipeId = $ele.parents(".item-container").attr("id");
            callback = (callback) ? callback : angular.noop;

            if($ele.hasClass("favorite-item")) {
                if(savedUser) {
                    __removeFromFavorites(recipeId, savedUser.userID).then(function(data) {
                        if(data) {
                            $ele.removeClass("favorite-item");
                            appStore.removeFromLocal("savedRecipes.savedItems_"+recipeId);
                            callback($ele);
                        }
                    });
                } else {
                    $ele.removeClass("favorite-item");
                    appStore.removeFromLocal("savedRecipes.savedItems_"+recipeId);
                    callback($ele);
                }
            } else {
                if(savedUser) {
                    __getFullRecipe(recipeId, savedUser.userID).then(function(data) {
                        if(data) {
                            $ele.addClass("favorite-item");
                            appStore.storeInLocal("savedRecipes.savedItems_"+recipeId, data);
                            callback($ele);
                        }
                    });
                } else {
                    if(recipeObj) {
                        $ele.addClass("favorite-item");
                        appStore.storeInLocal("savedRecipes.savedItems_"+recipeId, recipeObj);
                        callback($ele);
                    }
                }
            }
        }

        // this is a private function for removing recipe from favorite list
        function __removeFromFavorites(recipeId, userID) {
            var def = $q.defer();

            $ionicLoading.show();
            $http.get(CONFIG.SERVICE_URL.REMOVE_FAVORITE_RECIPE+"/"+userID+"/"+recipeId).success(function(data){
                $ionicLoading.hide();
                def.resolve(data);
            }).error(function() {
                $ionicLoading.hide();
                console.log("error in removing recipe from favorites");
                def.resolve([]);
            });

            return def.promise;
        }

        // this is private function for fetching full recipe list
        function __getFullRecipe(recipeId, userID) {
            var def = $q.defer();

            $ionicLoading.show();
            $http.get(CONFIG.SERVICE_URL.SET_FAVORITE_RECIPE+"/"+userID+"/"+recipeId).success(function(data){
                $ionicLoading.hide();
                def.resolve(data);
            }).error(function() {
                $ionicLoading.hide();
                console.log("error in setting recipe as favorites");
                def.resolve([]);
            });

            return def.promise;
        }
        
        return {
            getMenu: getMenu,
            addRemoveFavorite: addRemoveFavorite,
            highlightSelectedMenu: highlightSelectedMenu
        };

    };

    return factory;
});