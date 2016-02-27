define(['app'], function (app) {
    'use strict';
    
    app.config(['$stateProvider', '$urlRouterProvider', 'localeServiceProvider', '$authProvider', 'CONFIG', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, localeServiceProvider, $authProvider, CONFIG, $httpProvider) {

        /* initializing localization module */
        localeServiceProvider.configure();

        /* introducing http error handling generic interceptor across the application */
        $httpProvider.interceptors.push("errorsInterceptor");

        /* introducing facebook authorization */
        $authProvider.facebook({
            clientId: CONFIG.SOCIAL_ID.FACEBOOK,
            url: CONFIG.SERVICE_URL.FB_AUTH
        });

        /* initializing router */
        $stateProvider.state('home', {
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
        .state('home.myRecipe', {
            url: "/myRecipe",
            views: {
                'appContent': {
                    templateUrl: "templates/my-recipe/my-recipe.html",
                    controller: 'myRecipeController'
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

    // modifying default ionic loader template across the application
    app.constant('$ionicLoadingConfig', {
        duration : 60000,
        template: "<i class='icon ion-loading-b'></i>"
    });

    // once application is up, this listener will be triggered
    app.run(['localeService','$auth', function(localeService, $auth) {
        $auth.setStorageType('localStorage');
        localeService.setDefault();
    }]);
    
});