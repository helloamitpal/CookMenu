define(function () {
    'use strict';

    function DashboardController($scope, CONFIG, homeService, $ionicSlideBoxDelegate, appStore) {
        $scope.tabList = CONFIG.DASHBOARD.TABS;
        $scope.imagePath = CONFIG.MEDIA_PATH;
        $scope.showDesc = false;

        $scope.addToFavorite = homeService.addToFavorite;
        $scope.navigateToFullRecipe = function(recipe) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_ATTR, recipe);
        }
        $scope.openDescription = function(evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            $scope.showDesc = true;
        };
        $scope.showMoreCategorizedRecipes = function(filterObj) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_CATEGORY_ATTR, filterObj);
        };

        $scope.closeDescription = function(evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            $scope.showDesc = false;
        }

        // fetching special recipes list
        homeService.getRecipeList().then(function(data) {
            $scope.specialRecipeList = data.specialRecipeList;
            $scope.categoryList = data.categoryList;
            $ionicSlideBoxDelegate.update();
        });
    }

    DashboardController.$inject = ['$scope', 'CONFIG', 'homeService', '$ionicSlideBoxDelegate', 'appStore'];
    return DashboardController;
    
});