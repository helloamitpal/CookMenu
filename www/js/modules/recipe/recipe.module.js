define(function (require) {

    'use strict';

    var angular = require('angular'),
        config = require('config'),
        recipeModule = angular.module('app.recipe.module', ['app.config']);

    recipeModule.controller('recipeController', require('modules/recipe/controllers/recipe.controller'));
    recipeModule.controller('categoryController', require('modules/recipe/controllers/category.controller'));
    recipeModule.controller('savedRecipeController', require('modules/recipe/controllers/favorite.recipe.controller'));
    recipeModule.factory('recipeService', require('modules/recipe/services/recipe.service'));

    return recipeModule;

});