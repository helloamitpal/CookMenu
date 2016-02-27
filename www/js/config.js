define(['angular'], function (angular) {
	'use strict';
    
    // this is app configaration constant
	return angular.module('app.config', [])
		.constant('CONFIG', (function() {        
            var rootPath = "http://localhost:3000";
            return {
                APP_INFO: {
                    APP_VERSION: "0.1",
                    APP_NAME: "CookMenu",
                    APP_CONTACT: "cookMenu.support.me@gmail.com",
                    APP_DEVELOPER: "Saha & Pal Team"
                },
                NO_IMAGE_PATH: "resources/no_image.jpg",
                MEDIA_PATH: rootPath+"/images/",
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
                    FB_AUTH: rootPath+"/auth/facebook",
                    SPECIAL_RECIPE: rootPath+"/getAllSpecialRecipe",
                    ALL_CATEGORIZED_RECIPE: rootPath+"/getAllRecipeBy/random",
                    ALL_RECIPE_BY_CATEGORY: rootPath+"/getAllRecipeBy/category",
                    ALL_RECIPE_BY_TIMING: rootPath+"/getAllRecipeBy/timing",
                    ALL_RECIPE_BY_NAME: rootPath+"/getAllRecipeBy/name",
                    ALL_RECIPE_BY_ORIGIN: rootPath+"/getAllRecipeBy/origin",
                    SET_FAVORITE_RECIPE: rootPath+"/setFavoriteRecipe",
                    REMOVE_FAVORITE_RECIPE: rootPath+"/removeFavoriteRecipe",
                    LOGOUT_USER: rootPath+"/logout",
                    ALL_SAVED_RECIPES: rootPath+"/getAllSavedRecipe",
                    ALL_ORIGIN: rootPath+"/getAllOrigin",
                    ALL_TIMING: rootPath+"/getAllTiming",
                    ALL_CATEGORY: rootPath+"/getAllCategory",
                    SET_FAVORITE_RECIPE_BULK: rootPath+"/setFavoriteRecipeInBulk",
                    RECOMMEND_RECIPE: rootPath+"/recommendRecipe",
                    SUBMIT_COMMENT: rootPath+"/submitComment",
                    DELETE_COMMENT: rootPath+"/deleteComment",
                    SHARE_RECIPE_IN_SOCIAL: rootPath+"/shareRecipeInSocialMedia",
                    SUBMIT_RECIPE: rootPath+"/submitRecipe",
                    GET_ALL_MY_RECIPE: rootPath+"/getAllCreatedRecipeBy/cook"
                },
                LOCALE: {
                    AVAILABLE: [{
                        key: "en",
                        lang: "English"
                    },{
                        key: "de",
                        lang: "Deutsche"
                    },{
                        key: "fr",
                        lang: "Français"
                    },{
                        key: "es",
                        lang: "Español"
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