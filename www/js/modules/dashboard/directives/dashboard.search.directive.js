define(function () {
    'use strict';

    return function() {
        return {
            restrict : "E",
            templateUrl : "templates/dashboard/search.html",
            replace: true,
            scope: {
                showSearch: '='
            }
        };
    };
});