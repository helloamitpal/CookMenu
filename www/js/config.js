define(['angular'], function (angular) {
	'use strict';
    
    // this is app configaration constant
	return angular.module('app.config', [])
		.constant('CONFIG', (function() {        

            return {
                APP_INFO: {
                    APP_VERSION: "0.1",
                    APP_NAME: "CookMenu",
                    APP_CONTACT: "cookMenu.support.me@gmail.com",
                    APP_DEVELOPER: "Saha & Pal Team"
                },
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
                SOCIAL_ID: {
                    FACEBOOK:1212169925477977
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
                    FB_AUTH: "http://localhost:3000/auth/facebook",
                    SPECIAL_RECIPE: "http://localhost:3000/getAllSpecialRecipe",
                    ALL_CATEGORIZED_RECIPE: "http://localhost:3000/getAllRecipeBy/random",
                    ALL_RECIPE_BY_CATEGORY: "http://localhost:3000/getAllRecipeBy/category",
                    ALL_RECIPE_BY_TIMING: "http://localhost:3000/getAllRecipeBy/timing",
                    ALL_RECIPE_BY_NAME: "http://localhost:3000/getAllRecipeBy/name",
                    ALL_RECIPE_BY_ORIGIN: "http://localhost:3000/getAllRecipeBy/origin",
                    SET_FAVORITE_RECIPE: "http://localhost:3000/setFavoriteRecipe",
                    REMOVE_FAVORITE_RECIPE: "http://localhost:3000/removeFavoriteRecipe",
                    LOGOUT_USER: "http://localhost:3000/logout",
                    ALL_SAVED_RECIPES: "http://localhost:3000/getAllSavedRecipe",
                    ALL_ORIGIN: "http://localhost:3000/getAllOrigin",
                    ALL_TIMING: "http://localhost:3000/getAllTiming",
                    ALL_CATEGORY: "http://localhost:3000/getAllCategory",
                    SET_FAVORITE_RECIPE_BULK: "http://localhost:3000/setFavoriteRecipeInBulk",
                    RECOMMEND_RECIPE: "http://localhost:3000/recommendRecipe",
                    SUBMIT_COMMENT: "http://localhost:3000/submitComment"
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