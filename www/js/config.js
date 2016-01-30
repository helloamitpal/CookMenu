define(['angular'], function (angular) {
	'use strict';
    
    // this is app configaration constant
	return angular.module('app.config', [])
		.constant('CONFIG', (function() {        
            return {
                APP_VERSION: "0.1",
                APP_NAME: "CookMenu",
                NO_IMAGE_PATH: "resources/no_image.jpg",
                MEDIA_PATH: "http://localhost:3000/images/",
                INIT_CATEGORY_COUNT: 5,
                INIT_DYNAMIC_RECIPE_COUNT: 3,
                COMMENT_MAX_CHAR_LIMIT: 250,
                MAX_RECIPE_COUNT: 300,
                KEYCODE: {
                    ENTER: 13,
                    BACKSPACE: 8,
                    DELETE: 46
                },
                FILTER_KEY_MAP: {
                    CATEGORY: "category",
                    TIMING: "time",
                    NAME: "name",
                    ORIGIN: "origin"
                },
                CURRENT_RECIPE_ATTR: "currentRecipe",
                CURRENT_RECIPE_CATEGORY_ATTR: "currentCategory",
                SERVICE_URL: {
                    MENU:"resources/config/menu.json",
                    SPECIAL_RECIPE: "http://localhost:3000/getAllSpecialRecipe",
                    ALL_CATEGORIZED_RECIPE: "http://localhost:3000/getAllRecipeBy/random",
                    ALL_RECIPE_BY_CATEGORY: "http://localhost:3000/getAllRecipeBy/category",
                    ALL_RECIPE_BY_TIMING: "http://localhost:3000/getAllRecipeBy/timing",
                    ALL_RECIPE_BY_NAME: "http://localhost:3000/getAllRecipeBy/name",
                    ALL_RECIPE_BY_ORIGIN: "http://localhost:3000/getAllRecipeBy/origin"
                },
                LOCALE: {
                    AVAILABLE: [{
                        key: "en",
                        lang: "English"
                    },{
                        key: "de",
                        lang: "Deutsche"
                    }],
                    SELECTED: {}
                },
                DASHBOARD: {
                    TABS: [{
                        view: "",
                        icon: "ion-star"
                    }/*,{
                        view: "",
                        icon: "ion-coffee"
                    }*/]
                }
            };        
    })());
    
});