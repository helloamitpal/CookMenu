define(function () {
    'use strict';

    function SubmitRecipeController($scope, CONFIG, appStore, $ionicPopup, $state, $rootScope, $filter, recipeService) {
        $scope.originUrl = CONFIG.SERVICE_URL.ALL_ORIGIN;
        $scope.categoryUrl = CONFIG.SERVICE_URL.ALL_CATEGORY;
        $scope.timingUrl = CONFIG.SERVICE_URL.ALL_TIMING;
        $scope.isDirty = false;
        $scope.model = ((modelObj) ? modelObj : {
            name: "",
            shortNote: "",
            origin: [],
            timing: [],
            category: [],
            ingredients: [],
            fullDescription: [],
            selectedValues: {
                origin: [],
                timing: [],
                category: []
            }
        });
        $scope.isModified = false;

        var modelObj = appStore.getFromLocal("draftRecipe");

        $scope.submit = function(attr, data, selectedValues) {
            $scope.model[attr] = data;
            if($scope.model.selectedValues.hasOwnProperty(attr)) {
                $scope.model.selectedValues[attr] = selectedValues;
            }
        };

        $scope.resetPage = function(locationObj) {
            var confirmPopup = $ionicPopup.confirm({
                title: $filter('translate')('submitRecipe.reset'),
                template: $filter('translate')('submitRecipe.reset_description')
            });

            confirmPopup.then(function(res) {
                if(res) {
                    appStore.removeFromLocal("draftRecipe");
                    $scope.model = {
                        name: "",
                        shortNote: "",
                        origin: [],
                        timing: [],
                        category: [],
                        ingredients: [],
                        fullDescription: [],
                        selectedValues: {
                            origin: [],
                            timing: [],
                            category: []
                        }
                    };
                    $scope.isModified = false;
                    $scope.isDirty = false;
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
            var savedUser = appStore.getFromLocal("userLoggedInStatus");
            if(savedUser) {
                $scope.isDirty = recipeService.validateForm($scope.model);
                if(!$scope.isDirty) {
                    $scope.isModified = false;
                    recipeService.submitRecipe($scope.model, {
                        name: savedUser.name,
                        id: savedUser.userID
                    });
                }
            } else {
                $ionicPopup.alert({
                    title: $filter('translate')('submitRecipe.login_required'),
                    template: $filter('translate')('submitRecipe.login_required_description')
                });
            }
        };

        $scope.$watchCollection(function(){
            return $scope.model;
        }, function(newVal, oldVal){
            if(newVal && oldVal && !$.isEmptyObject(newVal) && !$.isEmptyObject(oldVal) && JSON.stringify(oldVal) != JSON.stringify(newVal)) {
                $scope.isModified = true;
            } else {
                $scope.isModified = false;
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
        });

        $scope.$watch(function(){
            return $("#formList .form-error").length;
        }, function(newVal, oldVal){
            if(newVal && newVal > 0) {
                $scope.isDirty = true;
            } else {
                $scope.isDirty = false;
            }
        });
    }

    SubmitRecipeController.$inject = ['$scope', 'CONFIG', 'appStore', '$ionicPopup', '$state', '$rootScope', '$filter', 'recipeService'];
    return SubmitRecipeController;

});