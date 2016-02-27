define(function () {
    "use strict";

    /* this factory is created for handling all http responses.
    * If any http request receive error in response or network connectivity is not there
    * then it will display some toaster message to user */

    errorService.$inject = ['$q', '$rootScope'];

    function errorService($q, $rootScope) {

        function response(response) {
            return response || $q.when(response);
        }

        function responseError(response) {
            $rootScope.$broadcast("httpError", true);
            return response;
        }

        return {
            response: response,
            responseError: responseError
        };
    };

    return errorService;
});