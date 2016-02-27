define(function () {
    'use strict';

    SubmitRecipeController.$inject = ['$scope', 'CONFIG', 'appStore', '$ionicPopup', '$state', '$rootScope', '$filter', 'recipeService'];

    function SubmitRecipeController($scope, CONFIG, appStore, $ionicPopup, $state, $rootScope, $filter, recipeService) {

        var modelObj = appStore.getFromLocal("draftRecipe"),
            editable = appStore.getFromAppStore(CONFIG.CURRENT_RECIPE_ATTR);

        $scope.originUrl = CONFIG.SERVICE_URL.ALL_ORIGIN;
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
        $scope.categoryUrl = CONFIG.SERVICE_URL.ALL_CATEGORY;
        $scope.timingUrl = CONFIG.SERVICE_URL.ALL_TIMING;
        $scope.isDirty = false;
        if(editable) {
            $scope.headerTitle = $filter('translate')('submitRecipe.edit_title');
            appStore.removeFromAppStore(CONFIG.CURRENT_RECIPE_ATTR);
            $.extend($scope.model, {
                name: editable.title,
                shortNote: editable.description,
                ingredients: editable.recipe.ingradient,
                fullDescription: editable.recipe["full_description"].split("\n\n"),
                selectedValues: {
                    origin: [editable.origin],
                    timing: [editable.time],
                    category: editable.category
                }
            });
        } else {
            $scope.headerTitle = $filter('translate')('submitRecipe.title');
            $.extend(true, $scope.model, modelObj);
        }
        $scope.isModified = false;

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
            $ionicPopup.alert({
                title: $filter('translate')('submitRecipe.draft_saved_title'),
                template: $filter('translate')('submitRecipe.draft_saved_description')
            });
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
        }, function(newVal){
            if(newVal && newVal > 0) {
                $scope.isDirty = true;
            } else {
                $scope.isDirty = false;
            }
        });
    }

    return SubmitRecipeController;

});