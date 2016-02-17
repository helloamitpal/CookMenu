define(function () {
    'use strict';

    function MenuController($rootScope, $timeout, $scope, $state, commonService, $ionicSideMenuDelegate, localeService, appStore, snService) {

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

        $scope.showSearch = function(evt) {
            evt.stopImmediatePropagation();

            if($state.current.name.indexOf("dashboard") >= 0) {
                var $target = $(evt.target);
                if($target.hasClass("title") || $target.hasClass("search-recipe")) {
                    $rootScope.showSearch = true;
                }
            }
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
        $scope.navigate = function(view, evt) {
            if(view != "googleLogin" && view != "facebookLogin") {
                $state.go(view);
                $ionicSideMenuDelegate.toggleLeft();
                commonService.highlightSelectedMenu($(evt.currentTarget));
            }
            if(view === "facebookLogin"){
                snService.makeLogin('facebook');
            }
        };

        //snService.checkLoginStatus();
        $timeout(function(){
            snService.checkLoginStatus();
        },100);
    }

    MenuController.$inject = ['$rootScope', '$timeout','$scope', '$state', 'commonService', '$ionicSideMenuDelegate', 'localeService', 'appStore', 'snService'];
    return MenuController;
    
});