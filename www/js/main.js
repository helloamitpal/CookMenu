requirejs.config({
    paths: {
        angular:          '../lib/js/angular/angular.min',
        uiRouter:         '../lib/js/angular-ui/angular-ui-router.min',
        ionic:            '../lib/js/ionic.bundle.min',
        underscore:       '../lib/js/underscore-min',
        jquery:           '../lib/js/jquery.min',
        translate:        '../lib/js/angular-translate.min',
        translateDynamic: '../lib/js/angular-translate-loader-partial.min',
        pdfMake:          '../lib/js/pdfmake.min',
        vfsFont:          '../lib/js/vfs_fonts',
        ngFB:             '../lib/js/satellizer.min',
        ngAutoComplete:   '../lib/js/ion-autocomplete.min'
    },
    shim: {
        angular : {
            exports : 'angular'
        },
        ngFB: {
            deps: ['angular']
        },
        pdfMake: {
            exports: 'pdfMake'
        },
        vfsFont: {
            exports: 'vfsFont',
            deps: ['pdfMake']
        },
        ngAutoComplete: {
            deps: ['ionic']
        },
        underscore: {
            exports: 'underscore'
        },
        uiRouter : {
            deps: ['angular']
        },
        jquery: {
            exports: 'jquery'
        },
        translate: {
            deps: ['angular']
        },
        translateDynamic: {
            deps: ['translate']
        },
        ionic :  {
            deps: ['angular'], 
            exports : 'ionic'
        }
    },
    priority: [
        'angular',
        'ionic',
        'jquery',
        'underscore',
        'pdfMake'
    ],
    deps: [
        'bootstrap'
    ]
});