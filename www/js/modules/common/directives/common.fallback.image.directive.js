define(function () {
    'use strict';

    /* this is default image directive.
    *  if server image is not downloaded or having some connection problem then
    *  it will replace that server side image with default image
    * */
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