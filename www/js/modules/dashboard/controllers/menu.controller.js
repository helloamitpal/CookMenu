define(function () {
    'use strict';

    function MenuController($scope, $state, commonService, $ionicSideMenuDelegate, localeService, homeService, appStore) {

        // locale setting
        if(! $scope.selectedLocale) {
            $scope.selectedLocale = localeService.getSelectedLocale();
            $scope.localeList = localeService.getLocaleList();
        }

        // change locale listener
        $scope.changeLocale = function(item) {
            $scope.selectedLocale = item;
            localeService.applySelected(item);
        };

        // this function is for toggling side menu panel
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        // this menu items list
        $scope.menuList = appStore.getFromAppStore('menuList');
        if(! $scope.menuList) {
            commonService.getMenu().then(function(data) {
                $scope.menuList = data;
                appStore.setToAppStore('menuList', data);
            });
        }

        // this is navigational function
        $scope.navigate = function(view) {
            $state.go(view);
        };

        homeService.titleClickListener();
    }

    MenuController.$inject = ['$scope', '$state', 'commonService', '$ionicSideMenuDelegate', 'localeService', 'homeService', 'appStore'];
    return MenuController;
    
});