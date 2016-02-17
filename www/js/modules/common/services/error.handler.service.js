define(function () {
    "use strict";

    var errorService = function ($q, $rootScope) {

        function response(response) {
            return response || $q.when(response);
        }

        function responseError(response) {
            $rootScope.$broadcast("httpError", true);
            //$q.reject(response);
            return response;
        }

        return {
            response: response,
            responseError: responseError
        };
    };

    errorService.$inject = ['$q', '$rootScope'];
    return errorService;
});