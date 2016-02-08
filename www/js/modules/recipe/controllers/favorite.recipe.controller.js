define(function () {
    'use strict';

    function SavedRecipeController($timeout, $ionicLoading, $filter, $scope, CONFIG, appStore, recipeService, commonService, $ionicActionSheet) {

        var actionSheet;
        $scope.imagePath = CONFIG.MEDIA_PATH;

        recipeService.getSavedRecipeList().then(function(list){
            $scope.savedRecipeList = list;
        });

        $scope.navigateToFullRecipe = function(recipe) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_ATTR, recipe);
        };

        $scope.removeFromFavorite = function(evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();

            actionSheet = $ionicActionSheet.show({
                destructiveText: $filter('translate')('favorites.remove'),
                titleText: $filter('translate')('favorites.remove_confirm_title'),
                cancelText: $filter('translate')('favorites.cancel'),
                destructiveButtonClicked: function() {
                    $ionicLoading.show();
                    commonService.addRemoveFavorite(evt, $scope.removedFromFavoriteCallback);
                }
            });
        }

        $scope.removedFromFavoriteCallback = function(ele) {
            $ionicLoading.hide();
            var $item = $(ele).parent(".item");
            $item.addClass("remove");
            actionSheet();
            $timeout(function(){
                $scope.savedRecipeList.splice($item.index(),1);
            });
        }
    }

    SavedRecipeController.$inject = ['$timeout', '$ionicLoading', '$filter', '$scope', 'CONFIG', 'appStore', 'recipeService', 'commonService', '$ionicActionSheet'];
    return SavedRecipeController;

});