define(function () {
    'use strict';

    /* this directive is common taster directive.
     * If any http request is receipe error in response or network
      * or network connection is not available then this directive will
      * trigger a toaster message to notify the user */
    return function() {
        return {
            restrict : "E",
            scope: false,
            templateUrl: "templates/dashboard/toaster.html",
            link: function postLink($scope) {
                $scope.isError = false;

                $scope.$on("httpError", function(){
                    $scope.isError = true;
                });

               $scope.closeMsg = function() {
                   $scope.isError = false;
               }
            }
        };
    };
});