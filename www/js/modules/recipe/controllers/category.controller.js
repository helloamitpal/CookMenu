define(function () {
    'use strict';

    function CategoryController($scope, CONFIG, appStore, recipeService) {
        var filterObj = appStore.getFromAppStore(CONFIG.CURRENT_RECIPE_CATEGORY_ATTR);
        $scope.categoryName = filterObj.value;
        $scope.imagePath = CONFIG.MEDIA_PATH;
        $scope.noMoreItemsAvailable = false;
        $scope.counter = appStore.getFromAppStore('scrollCounter_'+$scope.categoryName);
        $scope.counter = ($scope.counter) ? $scope.counter : 0;

        $scope.recipeList = appStore.getFromAppStore('fullCategorizedRecipeList_'+$scope.categoryName);
        if(! $scope.recipeList) {
            __loadRecipe();
        }

        $scope.navigateToFullRecipe = function(recipe) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_ATTR, recipe);
        };

        $scope.loadMoreRecipe = function() {
            $scope.counter++;
            __loadRecipe();
        };

        function __loadRecipe() {
            recipeService.getFullCategorizedRecipeList(filterObj.key, $scope.categoryName, $scope.counter, CONFIG.MAX_RECIPE_COUNT).then(function(data){
                if(data.length === 0 || data.length <= CONFIG.MAX_RECIPE_COUNT) {
                    $scope.noMoreItemsAvailable = true;
                }
                if($scope.recipeList && $scope.counter > 0) {
                    $scope.recipeList = $scope.recipeList.concat(data);
                } else {
                    $scope.recipeList = data;
                }
                appStore.getFromAppStore('scrollCounter_'+$scope.categoryName, $scope.counter);
                appStore.setToAppStore('fullCategorizedRecipeList_'+$scope.categoryName, $scope.recipeList);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }
    }

    CategoryController.$inject = ['$scope', 'CONFIG', 'appStore', 'recipeService'];
    return CategoryController;

});