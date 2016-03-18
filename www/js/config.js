define(['angular'], function (angular) {
	'use strict';
    
    // this is app configaration constant
	return angular.module('app.config', [])
		.constant('CONFIG', (function() {        

            var serverRootPath = "http://localhost:5000";

            return {
                APP_INFO: {
                    APP_VERSION: "0.1",
                    APP_NAME: "CookMenu",
                    APP_CONTACT: "cookMenu.support.me@gmail.com",
                    APP_DEVELOPER: "Saha & Pal Team"
                },
                NO_IMAGE_PATH: "resources/no_image.jpg",
                MEDIA_PATH: serverRootPath+"/images/",
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
                    FB_AUTH: serverRootPath+"/auth/facebook",
                    SPECIAL_RECIPE: serverRootPath+"/getAllSpecialRecipe",
                    ALL_CATEGORIZED_RECIPE: serverRootPath+"/getAllRecipeBy/random",
                    ALL_RECIPE_BY_CATEGORY: serverRootPath+"/getAllRecipeBy/category",
                    ALL_RECIPE_BY_TIMING: serverRootPath+"/getAllRecipeBy/timing",
                    ALL_RECIPE_BY_NAME: serverRootPath+"/getAllRecipeBy/name",
                    ALL_RECIPE_BY_ORIGIN: serverRootPath+"/getAllRecipeBy/origin",
                    SET_FAVORITE_RECIPE: serverRootPath+"/setFavoriteRecipe",
                    REMOVE_FAVORITE_RECIPE: serverRootPath+"/removeFavoriteRecipe",
                    LOGOUT_USER: serverRootPath+"/logout",
                    ALL_SAVED_RECIPES: serverRootPath+"/getAllSavedRecipe",
                    ALL_ORIGIN: serverRootPath+"/getAllOrigin",
                    ALL_TIMING: serverRootPath+"/getAllTiming",
                    ALL_CATEGORY: serverRootPath+"/getAllCategory",
                    SET_FAVORITE_RECIPE_BULK: serverRootPath+"/setFavoriteRecipeInBulk",
                    RECOMMEND_RECIPE: serverRootPath+"/recommendRecipe",
                    SUBMIT_COMMENT: serverRootPath+"/submitComment",
                    DELETE_COMMENT: serverRootPath+"/deleteComment",
                    SHARE_RECIPE_IN_SOCIAL: serverRootPath+"/shareRecipeInSocialMedia",
                    SUBMIT_RECIPE: serverRootPath+"/submitRecipe",
                    GET_ALL_MY_RECIPE: serverRootPath+"/getAllCreatedRecipeBy/cook",
                    DELETE_MY_RECIPE: serverRootPath+"/deleteMyRecipe"
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