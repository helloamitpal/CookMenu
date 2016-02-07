define(function () {
    'use strict';

    function MenuController($timeout, $scope, $state, commonService, $ionicSideMenuDelegate, localeService, homeService, appStore, snService) {

        $scope.$watch(function() {
            return appStore.getFromAppStore('userPhoto');
        }, function(newVal, oldVal) {
            if(newVal && oldVal != newVal) {
                $scope.userImage = appStore.getFromAppStore('userPhoto');
            }
        });

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
                homeService.titleClickListener();
                $timeout(function(){
                    snService.checkLoginStatus();
                },50);
            });
        }

        // this is navigational function
        $scope.navigate = function(view) {
            if(view != "googleLogin" && view != "facebookLogin") {
                $state.go(view);
            }
            if(view === "facebookLogin"){
                snService.makeLogin('facebook');
            }
        };
    }

    MenuController.$inject = ['$timeout','$scope', '$state', 'commonService', '$ionicSideMenuDelegate', 'localeService', 'homeService', 'appStore', 'snService'];
    return MenuController;
    
});