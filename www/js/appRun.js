define(['app'], function(app){
    'use strict';

    // once application is up, this listener will be triggered
    app.run(['localeService','$auth', '$rootScope', '$window', function(localeService, $auth, $rootScope, $window) {
        $auth.setStorageType('localStorage');
        localeService.setDefault();

        $window.addEventListener("online", function(){
            $rootScope.$digest();
        });

        $window.addEventListener("offline", function(){
            $rootScope.$digest();
        });

    }]);
});