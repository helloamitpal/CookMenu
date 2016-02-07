define(['app'], function (app) {
    'use strict';
    
    app.config(['$stateProvider', '$urlRouterProvider', 'localeServiceProvider', '$authProvider', 'CONFIG',
        function ($stateProvider, $urlRouterProvider, localeServiceProvider, $authProvider, CONFIG) {

        /* initializing localization module */
        localeServiceProvider.configure();

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
                    templateUrl: "templates/favorites/favorite-recipe.html"
                }
            }
        })
        .state('fullRecipe', {
            url: "/fullRecipe",
            templateUrl: "templates/recipe/full-recipe.html",
            controller: 'recipeController',
            resolve: {
                loadLocales: function(localeService) {
                    localeService.loadLocale('recipe');
                    return true;
                }
            }
        })
        .state('fullCategory', {
            url: "/fullCategory",
            templateUrl: "templates/recipe/full-category.html",
            controller: 'categoryController',
            resolve: {
                loadLocales: function(localeService) {
                    localeService.loadLocale('recipe');
                    return true;
                }
            }
        });
           
        $urlRouterProvider.otherwise("/home/dashboard");
    }]);
    
    app.run(['localeService','$auth', function(localeService, $auth) {
        $auth.setStorageType('localStorage');
        localeService.setDefault();
    }]);
    
});