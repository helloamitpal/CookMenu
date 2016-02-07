define(function () {
    'use strict';

    return ['CONFIG','appStore','$state','$rootScope', function(CONFIG, appStore, $state, $rootScope) {
        return {
            restrict : "E",
            templateUrl : "templates/dashboard/search.html",
            replace: true,
            controller: function($scope) {
                $scope.filter = "name";

                $scope.submitFilterSearch = function(evt) {
                    evt.stopImmediatePropagation();
                    if($.trim($scope.searchStr) && (evt.keyCode === CONFIG.KEYCODE.ENTER || evt.currentTarget.nodeName.toLowerCase() === "button")) {
                        $rootScope.showSearch = false;
                        appStore.setToAppStore(CONFIG.CURRENT_RECIPE_CATEGORY_ATTR, {
                            key: $scope.filter,
                            value: $.trim($scope.searchStr)
                        });
                        $state.go("home.fullCategory");
                    }
                }
            },
            scope: {
                showSearch: '='
            }
        };
    }];
});