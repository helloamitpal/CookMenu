define(function () {
    'use strict';

    function SubmitRecipeController($scope, CONFIG, appStore, $ionicPopup, $state, $rootScope, $filter) {
        $scope.originUrl = CONFIG.SERVICE_URL.ALL_ORIGIN;
        $scope.categoryUrl = CONFIG.SERVICE_URL.ALL_CATEGORY;
        $scope.timingUrl = CONFIG.SERVICE_URL.ALL_TIMING;
        var modelObj = appStore.getFromLocal("draftRecipe");

        $scope.model = ((modelObj) ? modelObj : {});
        $scope.isModified = false;

        $scope.submit = function(attr, data) {
            $scope.model[attr] = data;
        };

        $scope.resetPage = function(locationObj) {
            var confirmPopup = $ionicPopup.confirm({
                title: $filter('translate')('submitRecipe.reset'),
                template: $filter('translate')('submitRecipe.reset_description')
            });

            confirmPopup.then(function(res) {
                if(res) {
                    appStore.removeFromLocal("draftRecipe");
                    $scope.model = {};
                    $scope.isModified = false;
                    if(locationObj) {
                        $state.go(locationObj.stateName, locationObj.params);
                    }
                }
            });
        };

        $scope.makeDraft = function() {
            $scope.isModified = false;
            appStore.storeInLocal("draftRecipe", $scope.model);
        };

        $scope.submitRecipe = function() {
            $scope.isModified = false;
        };

        $scope.$watchCollection(function(){
            return $scope.model;
        }, function(newVal, oldVal){
            if(newVal && !$.isEmptyObject(newVal) && oldVal != newVal) {
                $scope.isModified = true;
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams){
            if($scope.isModified) {
                event.preventDefault();
                $scope.resetPage({
                    stateName: toState.name,
                    params: toParams
                });
            } else {
                return;
            }
        })
    }

    SubmitRecipeController.$inject = ['$scope', 'CONFIG', 'appStore', '$ionicPopup', '$state', '$rootScope', '$filter'];
    return SubmitRecipeController;

});