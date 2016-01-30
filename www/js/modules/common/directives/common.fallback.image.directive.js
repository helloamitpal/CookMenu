define(function () {
    'use strict';

    return ['CONFIG', function(CONFIG) {
        return {
            restrict : "A",
            link: function postLink(scope, element) {
                element.bind('error', function() {
                    $(this).attr("src", CONFIG.NO_IMAGE_PATH);
                });
            }
        };
    }];
});