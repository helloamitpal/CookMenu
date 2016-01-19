define(function () {
    'use strict';

    function CategoryController($scope, CONFIG, appStore, recipeService, $ionicSlideBoxDelegate) {
        var filterObj = appStore.getFromAppStore(CONFIG.CURRENT_RECIPE_CATEGORY_ATTR);
        $scope.categoryName = filterObj.value;
        $scope.imagePath = CONFIG.MEDIA_PATH;

        recipeService.getFullCategorizedRecipeList(filterObj.key, $scope.categoryName).then(function(data){
            $scope.recipeList = data;
            $ionicSlideBoxDelegate.update();
        });

        $scope.navigateToFullRecipe = function(recipe) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_ATTR, recipe);
        }
    }

    CategoryController.$inject = ['$scope', 'CONFIG', 'appStore', 'recipeService', '$ionicSlideBoxDelegate'];
    return CategoryController;

});