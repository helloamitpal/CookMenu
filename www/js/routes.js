define(['app'], function (app) {
    'use strict';
    
    app.config(['$stateProvider', '$urlRouterProvider', 'localeServiceProvider', '$authProvider', 'CONFIG', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, localeServiceProvider, $authProvider, CONFIG, $httpProvider) {

        /* initializing localization module */
        localeServiceProvider.configure();

        $httpProvider.interceptors.push("errorsInterceptor");

        $authProvider.facebook({
            clientId: CONFIG.SOCIAL_ID.FACEBOOK,
            url: CONFIG.SERVICE_URL.FB_AUTH
        });

        /* initializing router */
        $stateProvider.state('login', {
            url: "/login",
            templateUrl: "templates/login/login.html",
            controller: 'loginController',
            resolve: {
                loadLocales: function(localeService) {
                    localeService.loadLocale('login');
                    return true;
                }
            }
        })
        .state('home', {
            url: '/home',
            abstract: true,
            templateUrl: "templates/dashboard/home.html",
            controller: 'menuController',
            resolve: {
                loadLocales: function(localeService) {
                    localeService.loadLocale('dashboard');
                    return true;
                }
            }       
        })
        .state('home.about', {
            url: "/about",
            views: {
                'appContent': {
                    templateUrl: "templates/about/about.html"
                }
            }
        })
        .state('home.dashboard', {
            url: "/dashboard",
            views: {
                'appContent': {
                    templateUrl: "templates/dashboard/dashboard.html",
                    controller: 'dashboardController'
                }
            }
        })
        .state('home.favorites', {
            url: "/favorites",
            views: {
                'appContent': {
                    templateUrl: "templates/favorites/favorite-recipe.html",
                    controller: 'savedRecipeController'
                }
            },
            resolve: {
                loadLocales: function(localeService) {
                    localeService.loadLocale('recipe');
                    return true;
                }
            }
        })
        .state('home.submitRecipe', {
            url: "/submitRecipe",
            views: {
                'appContent': {
                    templateUrl: "templates/submit-recipe/submit-recipe.html",
                    controller: 'submitRecipeController'
                }
            },
            resolve: {
                loadLocales: function(localeService) {
                    localeService.loadLocale('recipe');
                    return true;
                }
            }
        })
        .state('home.fullRecipe', {
            url: "/fullRecipe",
            views: {
                'appContent': {
                    templateUrl: "templates/recipe/full-recipe.html",
                    controller: 'recipeController'
                }
            },
            resolve: {
                loadLocales: function(localeService) {
                    localeService.loadLocale('recipe');
                    return true;
                }
            }
        })
        .state('home.fullCategory', {
            url: "/fullCategory",
            views: {
                'appContent': {
                    templateUrl: "templates/recipe/full-category.html",
                    controller: 'categoryController'
                }
            },
            resolve: {
                loadLocales: function(localeService) {
                    localeService.loadLocale('recipe');
                    return true;
                }
            }
        });
           
        $urlRouterProvider.otherwise("/home/dashboard");
    }]);

    app.constant('$ionicLoadingConfig', {
        duration : 60000,
        template: "<i class='icon ion-loading-b'></i>"
    });
    
    app.run(['localeService','$auth', function(localeService, $auth) {
        $auth.setStorageType('localStorage');
        localeService.setDefault();
    }]);
    
});