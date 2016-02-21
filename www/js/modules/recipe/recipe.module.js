define(function (require) {

    'use strict';

    var angular = require('angular'),
        config = require('config'),
        recipeModule = angular.module('app.recipe.module', ['app.config']);

    recipeModule.controller('recipeController', require('modules/recipe/controllers/recipe.controller'));
    recipeModule.controller('categoryController', require('modules/recipe/controllers/category.controller'));
    recipeModule.controller('savedRecipeController', require('modules/recipe/controllers/favorite.recipe.controller'));
    recipeModule.controller('submitRecipeController', require('modules/recipe/controllers/submit.recipe.controller'));
    recipeModule.factory('recipeService', require('modules/recipe/services/recipe.service'));
    recipeModule.directive('selection', require('modules/recipe/directives/selection.directive'));
    recipeModule.directive('editor', require('modules/recipe/directives/editor.directive'));
    recipeModule.directive('commentBox', require('modules/recipe/directives/commentbox.directive'));

    return recipeModule;

});