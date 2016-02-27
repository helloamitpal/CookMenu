define(function () {
    'use strict';

    function MyRecipeController($scope, CONFIG, appStore, recipeService, $state) {

        var savedUser = appStore.getFromLocal("userLoggedInStatus");
        $scope.imagePath = CONFIG.MEDIA_PATH;
        $scope.showButtons = -1;

        if(savedUser) {
            recipeService.getAllMyRecipes(savedUser.userID).then(function(list){
                $scope.myRecipeList = list;
            });
        }

        $scope.displayButtonSet = function(index) {
            $scope.showButtons = ($scope.showButtons === index) ? -1 : index;
        };

        $scope.navigateToRecipe = function(recipe, command) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_ATTR, recipe);
            if(command === 'view') {
                $state.go("home.fullRecipe");
            } else if(command === 'edit') {
                $state.go("home.submitRecipe");
            }
        };
    }

    MyRecipeController.$inject = ['$scope', 'CONFIG', 'appStore', 'recipeService', '$state'];
    return MyRecipeController;

});