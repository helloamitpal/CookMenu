define(function () {
    'use strict';

    function SavedRecipeController($timeout, $ionicLoading, $filter, $scope, CONFIG, appStore, recipeService, commonService, $ionicPopup) {

        $scope.imagePath = CONFIG.MEDIA_PATH;

        $scope.$on("loggedOut", __updateSpecialRecipe);
        $scope.$on("loggedIn", __updateSpecialRecipe);
        __updateSpecialRecipe();

        $scope.navigateToFullRecipe = function(recipe) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_ATTR, recipe);
        };

        $scope.removeFromFavorite = function(evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();

            var confirmPopup = $ionicPopup.confirm({
                title: $filter('translate')('favorites.remove_confirm_title'),
                template: $filter('translate')('favorites.remove_confirm_description')
            });

            confirmPopup.then(function(res) {
                if(res) {
                    $ionicLoading.show();
                    commonService.addRemoveFavorite(evt, undefined, $scope.removedFromFavoriteCallback);
                }
            });
        }

        $scope.removedFromFavoriteCallback = function(ele) {
            $ionicLoading.hide();
            var $item = $(ele).parent(".item");
            $item.addClass("remove");
            $timeout(function(){
                $scope.savedRecipeList.splice($item.index(),1);
            });
        }

        function __updateSpecialRecipe() {
            recipeService.getSavedRecipeList().then(function(list){
                $scope.savedRecipeList = list;
            });
        }
    }

    SavedRecipeController.$inject = ['$timeout', '$ionicLoading', '$filter', '$scope', 'CONFIG', 'appStore', 'recipeService', 'commonService', '$ionicPopup'];
    return SavedRecipeController;

});