define(function () {
    'use strict';

    function MyRecipeController($scope, CONFIG, appStore, recipeService) {

        var savedUser = appStore.getFromLocal("userLoggedInStatus");
        $scope.imagePath = CONFIG.MEDIA_PATH;

        if(savedUser) {
            recipeService.getAllMyRecipes(savedUser.userID).then(function(list){
                $scope.myRecipeList = list;
            });
        }

        $scope.navigateToEditRecipe = function(recipe) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_ATTR, recipe);
        };
    }

    MyRecipeController.$inject = ['$scope', 'CONFIG', 'appStore', 'recipeService'];
    return MyRecipeController;

});