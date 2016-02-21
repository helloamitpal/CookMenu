define(function () {
    'use strict';

    return function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: "templates/recipe/comments.html",
            scope: true
        };
    };

});