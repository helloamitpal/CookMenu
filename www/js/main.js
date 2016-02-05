requirejs.config({
    paths: {
        angular:          '../lib/js/angular/angular.min',
        angularAnimate:   '../lib/js/angular/angular-animate.min',
        angularSanitize:  '../lib/js/angular/angular-sanitize.min',
        uiRouter:         '../lib/js/angular-ui/angular-ui-router.min',
        ionic:            '../lib/js/ionic.bundle.min',
        underscore:       '../lib/js/underscore-min',
        text:             '../lib/js/text',
        jquery:           '../lib/js/jquery.min',
        moment:           '../lib/js/moment.min',
        translate:        '../lib/js/angular-translate.min',
        translateDynamic: '../lib/js/angular-translate-loader-partial.min',
        pdfMake:          '../lib/js/pdfmake.min',
        vfsFont:          '../lib/js/vfs_fonts',
        ngFB:             '../lib/js/satellizer.min'
    },
    shim: {
        angular : {
            exports : 'angular'
        },
        ngFB: {
            exports: 'ngFB',
            deps: ['angular']
        },
        pdfMake: {
            exports: 'pdfMake'
        },
        vfsFont: {
            exports: 'vfsFont',
            deps: ['pdfMake']
        },
        angularAnimate : {
            deps: ['angular']
        },
        angularSanitize : {
            deps: ['angular']
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
            exports: 'translate',
            deps: ['angular']
        },
        translateDynamic: {
            exports: 'translateDynamic',
            deps: ['translate']
        },
        moment: {
            deps: ['jquery'],
            exports: 'moment'            
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
        'translate',
        'underscore',
        'pdfMake',
        'ngFB'
    ],
    deps: [
        'bootstrap'
    ]
});