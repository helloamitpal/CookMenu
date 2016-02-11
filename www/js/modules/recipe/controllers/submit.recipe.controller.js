define(function () {
    'use strict';

    function SubmitRecipeController($scope, CONFIG) {
        $scope.originUrl = CONFIG.SERVICE_URL.ALL_ORIGIN;
        $scope.categoryUrl = CONFIG.SERVICE_URL.ALL_CATEGORY;
        $scope.timingUrl = CONFIG.SERVICE_URL.ALL_TIMING;
        $scope.model = {};

        $scope.submit = function(attr, data) {
            $scope.model[attr] = data;
        };
    }

    SubmitRecipeController.$inject = ['$scope', 'CONFIG'];
    return SubmitRecipeController;

});