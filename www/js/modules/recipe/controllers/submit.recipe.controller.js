define(function () {
    'use strict';

    SubmitRecipeController.$inject = ['$scope', 'CONFIG', 'appStore', '$ionicPopup', '$state', '$rootScope', '$filter', 'recipeService'];

    function SubmitRecipeController($scope, CONFIG, appStore, $ionicPopup, $state, $rootScope, $filter, recipeService) {

        __resetPage();

        var modelObj = appStore.getFromLocal("draftRecipe"),
            editable = appStore.getFromAppStore(CONFIG.CURRENT_RECIPE_ATTR);

        $scope.originUrl = CONFIG.SERVICE_URL.ALL_ORIGIN;
        $scope.categoryUrl = CONFIG.SERVICE_URL.ALL_CATEGORY;
        $scope.timingUrl = CONFIG.SERVICE_URL.ALL_TIMING;
        if(editable) {
            $scope.isEditable = true;
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
            $.extend(true, $scope.model, modelObj);
        }

        $scope.submit = function(attr, data, selectedValues) {
            $scope.model[attr] = data;
            if($scope.model.selectedValues.hasOwnProperty(attr)) {
                $scope.model.selectedValues[attr] = selectedValues;
            }
        };

        $scope.deleteRecipe = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: $filter('translate')('submitRecipe.delete_recipe'),
                template: $filter('translate')('submitRecipe.delete_recipe_description')
            });

            confirmPopup.then(function(res) {
                if(res) {
                    recipeService.deleteRecipe(editable._id).then(function(flag){
                        if(flag) {
                            var alertPopup = $ionicPopup.alert({
                                title: $filter('translate')('submitRecipe.delete_recipe_done'),
                                template: $filter('translate')('submitRecipe.delete_recipe_done_description')
                            });

                            alertPopup.then(function() {
                                $state.go("home.myRecipe");
                            });
                        }
                    });
                }
            });
        };

        $scope.resetPage = function(locationObj) {
            var confirmPopup = $ionicPopup.confirm({
                title: $filter('translate')('submitRecipe.reset'),
                template: $filter('translate')('submitRecipe.reset_description')
            });

            confirmPopup.then(function(res) {
                if(res) {
                    appStore.removeFromLocal("draftRecipe");
                    __resetPage();
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
                    }, editable._id);
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

        // this private function is resetting the page
        function __resetPage() {
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
            $scope.isDirty = false;
            $scope.isModified = false;
        }
    }

    return SubmitRecipeController;

});