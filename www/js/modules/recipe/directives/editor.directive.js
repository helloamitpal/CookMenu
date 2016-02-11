define(function () {
    'use strict';

    return [
        '$ionicModal', '$http', '$ionicGesture', '$ionicLoading', '$filter',
        function ($ionicModal, $http, $ionicGesture, $ionicLoading, $filter) {

            var template =
                ['<div class="selection-container">',
                    '<i class="icon ion-plus-circled"></i>',
                    '<div class="placeholder-text">{{placeholder}}</div>',
                    '<div class="selected-values"></div>'
                ].join('');

            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                template: template,
                scope: {
                    maxlength: "@",
                    placeholder: "@",
                    modalHeader: "@",
                    maxAddition: "@",
                    attrName: "@",
                    submitData: "&"
                },
                link: function ($scope, element) {

                }
            };
        }
    ];
});