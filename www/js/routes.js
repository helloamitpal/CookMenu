define(['app'], function (app) {
    'use strict';
    
    app.config(['$stateProvider', '$urlRouterProvider', 'localeServiceProvider',
        function ($stateProvider, $urlRouterProvider, localeServiceProvider) {

        /* initializing localization module */
        localeServiceProvider.configure();

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
        .state('about', {
            url: "/about",
            templateUrl: "templates/dashboard/menu/about.html"
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
        })
        .state('home.dashboard', {
            url: "/dashboard",                        
            views: {
                'appContent': {
                    templateUrl: "templates/dashboard/dashboard.html",
                    controller: 'dashboardController'
                }
            }
        });
           
        $urlRouterProvider.otherwise("/home/dashboard");
    }]);
    
    app.run(['localeService', '$state', '$ionicConfig', function(localeService) {
        localeService.setDefault();
    }]);
    
});