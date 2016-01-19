define(function () {
    'use strict';

    function MenuController($scope, $state, commonService, $ionicSideMenuDelegate, localeService, homeService) {

        // locale setting
        $scope.selectedLocale = localeService.getSelectedLocale();
        $scope.localeList = localeService.getLocaleList();

        // change locale listener
        $scope.changeLocale = function(item) {
            $scope.selectedLocale = item;
            localeService.applySelected(item);
        }

        // this function is for toggling side menu panel
        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }

        // this menu items list
        commonService.getMenu().then(function(data) {
            $scope.menuList = data;            
        });

        // this is navigational function
        $scope.navigate = function(view) {

        }

        homeService.titleClickListener();
    }

    MenuController.$inject = ['$scope', '$state', 'commonService', '$ionicSideMenuDelegate', 'localeService', 'homeService'];
    return MenuController;
    
});