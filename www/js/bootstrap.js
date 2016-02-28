define(['jquery', 'app', 'routes','appRun'], function ($, app) {
    'use strict';

    var $document = $(document),
        onDeviceReady = function () {
            try {
                angular.bootstrap(document, [app.name]);
            } catch (e) {
                console.error(e.stack || e.message || e);
            }
        };

    $document.on("deviceready", onDeviceReady);
    
    // if this application is opened in desktop browser then this section will be executed
    if (typeof cordova === 'undefined') {
        $document.ready(onDeviceReady);
    }
    
});