define(function () {
    'use strict';

    DashboardController.$inject = ['$scope', 'CONFIG', 'homeService', '$ionicSlideBoxDelegate', 'appStore'];

    function DashboardController($scope, CONFIG, homeService, $ionicSlideBoxDelegate, appStore) {

        $scope.tabList = CONFIG.DASHBOARD.TABS;
        $scope.imagePath = CONFIG.MEDIA_PATH;
        $scope.showDesc = false;

        $scope.navigateToFullRecipe = function(recipe) {
            appStore.setToAppStore(CONFIG.CURRENT_RECIPE_ATTR, recipe);
        };
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
        };

        // fetching special recipes list
        $scope.specialRecipeList = appStore.getFromAppStore('specialRecipeList');
        if(! $scope.specialRecipeList) {
            homeService.getSpecialRecipeList().then(function(data) {
                $scope.specialRecipeList = data;
                appStore.setToAppStore('specialRecipeList', data);
                $ionicSlideBoxDelegate.update();
            });
        }

        // fetching all random categorized list
        $scope.getAllCategorizedList = function(isPulled) {
            // fetching categorized recipes list
            $scope.categoryList = appStore.getFromAppStore('categoryList');
            if(! $scope.categoryList || isPulled) {
                homeService.getRecipeList().then(function(data) {
                    $scope.categoryList = data;
                    appStore.setToAppStore('categoryList', data);
                    $ionicSlideBoxDelegate.update();
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }
        };

        $scope.getAllCategorizedList();
    }

    return DashboardController;
    
});