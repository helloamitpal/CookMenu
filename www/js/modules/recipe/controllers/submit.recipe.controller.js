define(function () {
    'use strict';

    function SubmitRecipeController($scope, CONFIG, appStore) {
        $scope.originUrl = CONFIG.SERVICE_URL.ALL_ORIGIN;
        $scope.categoryUrl = CONFIG.SERVICE_URL.ALL_CATEGORY;
        $scope.timingUrl = CONFIG.SERVICE_URL.ALL_TIMING;
        var modelObj = appStore.getFromLocal("draftRecipe");

        $scope.model = ((modelObj) ? modelObj : {});
        $scope.isModified = false;

        $scope.submit = function(attr, data) {
            $scope.model[attr] = data;
        };

        $scope.makeDraft = function() {
            $scope.isModified = false;
            appStore.storeInLocal("draftRecipe", $scope.model);
        };

        $scope.submitRecipe = function() {
            $scope.isModified = false;
        };

        $scope.resetPage = function() {
            appStore.removeFromLocal("draftRecipe");
            $scope.model = {};
            $scope.isModified = false;
        };

        $scope.$watchCollection(function(){
            return $scope.model;
        }, function(newVal, oldVal){
            if(newVal && !$.isEmptyObject(newVal) && oldVal != newVal) {
                $scope.isModified = true;
            }
        });

    }

    SubmitRecipeController.$inject = ['$scope', 'CONFIG', 'appStore'];
    return SubmitRecipeController;

});