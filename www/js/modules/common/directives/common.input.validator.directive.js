define(function () {
    'use strict';

    return function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                var pattern = /[^0-9a-zA-Z !&()*+,\-.:=?@\[\]_|~]*/g;
                function fromUser(text) {
                    if (!text)
                        return text;

                    var transformedInput = text.replace(pattern, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    };
});