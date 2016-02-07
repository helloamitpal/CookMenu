define(function () {
    'use strict';

    function SavedRecipeController($scope, CONFIG, appStore, recipeService) {

        $scope.imagePath = CONFIG.MEDIA_PATH;

        recipeService.getSavedRecipeList().then(function(list){
            $scope.savedRecipeList = list;
        });

        $scope.navigateToFullRecipe = function(recipe) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_ATTR, recipe);
        };
    }

    SavedRecipeController.$inject = ['$scope', 'CONFIG', 'appStore', 'recipeService'];
    return SavedRecipeController;

});