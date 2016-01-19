define(['angular'], function (angular) {
	'use strict';
    
    // this is app configaration constant
	return angular.module('app.config', [])
		.constant('CONFIG', (function() {        
            return {
                APP_VERSION: "0.1",
                MEDIA_PATH: "resources/",
                INIT_CATEGORY_COUNT: 5,
                INIT_DYNAMIC_RECIPE_COUNT: 3,
                COMMENT_MAX_CHAR_LIMIT: 100,
                KEYCODE: {
                    ENTER: 13,
                    BACKSPACE: 8,
                    DELETE: 46
                },
                CURRENT_RECIPE_ATTR: "currentRecipe",
                CURRENT_RECIPE_CATEGORY_ATTR: "currentCategory",
                SERVICE_URL: {
                    MENU:"resources/config/menu.json",
                    ALL_CATEGORY: "resources/config/category.json",
                    ALL_RECIPE: "resources/config/recipes.json"
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