define(function () {
    'use strict';

    function SubmitRecipeController($scope, CONFIG) {
        $scope.originUrl = CONFIG.SERVICE_URL.ALL_ORIGIN;
        $scope.categoryUrl = CONFIG.SERVICE_URL.ALL_CATEGORY;
        $scope.timingUrl = CONFIG.SERVICE_URL.ALL_TIMING;
    }

    SubmitRecipeController.$inject = ['$scope', 'CONFIG'];
    return SubmitRecipeController;

});