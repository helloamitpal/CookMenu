define(function () {
    "use strict";

    var factory = function ($http, $q, CONFIG, appStore, $ionicLoading) {
        
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


        function highlightSelectedMenu(ele) {
            var $ele = $(ele);
            $ele.siblings().removeClass("selected-menu");
            $ele.addClass("selected-menu");
        }

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
                            __updateCurrentList(recipeId);
                            callback($ele);
                        }
                    });
                } else {
                    $ele.removeClass("favorite-item");
                    appStore.removeFromLocal("savedRecipes.savedItems_"+recipeId);
                    __updateCurrentList(recipeId);
                    callback($ele);
                }
            } else {
                if(savedUser) {
                    __getFullRecipe(recipeId, savedUser.userID).then(function(data) {
                        if(data) {
                            $ele.addClass("favorite-item");
                            appStore.storeInLocal("savedRecipes.savedItems_"+recipeId, data);
                            __updateCurrentList(recipeId);
                            callback($ele);
                        }
                    });
                } else {
                    if(recipeObj) {
                        $ele.addClass("favorite-item");
                        appStore.storeInLocal("savedRecipes.savedItems_"+recipeId, recipeObj);
                        __updateCurrentList(recipeId);
                        callback($ele);
                    }
                }
            }
        }

        function __updateCurrentList(recipeId) {
            var obj, arr = appStore.getFromAppStore('specialRecipeList');
            for(var index=0, len=arr.length; index<len; index++) {
                obj = arr[index];
                if(obj._id == recipeId) {
                    obj.isSaved = true;
                }
            }
            appStore.setToAppStore('specialRecipeList', arr);
        }

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

    factory.$inject = ['$http', '$q', 'CONFIG', 'appStore', '$ionicLoading'];
    return factory;
});