define(function () {
    "use strict";

    var factory = function ($http, $q, CONFIG, $ionicLoading, $filter, appStore, $ionicPopup, $state) {

        function getSavedRecipeList() {
            var list = [], def = $q.defer(), savedRecipes = appStore.getFromLocal("savedRecipes");
            if(savedRecipes) {
                for(var attr in savedRecipes) {
                    list.push(savedRecipes[attr]);
                }
                def.resolve(list);
            } else {
                def.resolve([]);
            }
            return def.promise;
        }

        function getFullCategorizedRecipeList(key, categoryName, counter, maxCount) {
            var url = "", def = $q.defer();

            $ionicLoading.show();

            if(key === CONFIG.FILTER_KEY_MAP.CATEGORY) {
                url = CONFIG.SERVICE_URL.ALL_RECIPE_BY_CATEGORY;
            } else if(key === CONFIG.FILTER_KEY_MAP.TIMING) {
                url = CONFIG.SERVICE_URL.ALL_RECIPE_BY_TIMING;
            } else if(key === CONFIG.FILTER_KEY_MAP.NAME) {
                url = CONFIG.SERVICE_URL.ALL_RECIPE_BY_NAME;
            } else if(key === CONFIG.FILTER_KEY_MAP.ORIGIN) {
                url = CONFIG.SERVICE_URL.ALL_RECIPE_BY_ORIGIN;
            }

            $http.get(url+"/"+categoryName+"/"+counter+"/"+maxCount).success(function(data) {
                $ionicLoading.hide();
                def.resolve(data || []);
            }).error(function(err) {
                $ionicLoading.hide();
                console.log("Problem in categorized recipes loading:"+err);
                def.resolve([]);
            });
            return def.promise;
        }

        function getPDFDocDefinition(recipe) {
            var def = $q.defer();

            __getBase64FormatOfImg(CONFIG.MEDIA_PATH+recipe.media).then(function(base64Str){
                var obj = {}, content = [];

                content.push({
                    text: recipe.title,
                    style: 'header'
                });
                content.push({
                    image: base64Str,
                    style: 'image'
                });
                content.push({
                    text: recipe.description,
                    style: 'description'
                });
                content.push({
                    text: $filter('translate')('recipe.ingredient-title'),
                    style: 'title'
                });
                content.push({
                    ul: recipe.recipe.ingradient.slice(),
                    style: 'default'
                });
                content.push({
                    text: $filter('translate')('recipe.ingredient-process'),
                    style: 'title'
                });
                content.push({
                    text: recipe.recipe.full_description,
                    style: 'default'
                });

                obj.styles = {
                    default: {
                        fontSize: 14,
                        fontFamily: 'arial'
                    },
                    title: {
                        fontSize: 24,
                        margin: 10,
                        fontFamily: 'arial'
                    },
                    image: {
                        alignment: "center"
                    },
                    description: {
                        fontSize: 10,
                        margin: 10,
                        fontFamily: 'arial'
                    },
                    header: {
                        fontSize: 30,
                        bold: true,
                        fontFamily: 'arial',
                        margin: 10
                    }
                };
                obj.content = content;
                obj.pageSize = 'A4';
                obj.info = {
                    title: (CONFIG.APP_INFO.APP_NAME+recipe.title),
                    author: recipe.cook.name,
                    keywords: recipe.category.join(" ")
                };
                def.resolve(obj);
            });

            return def.promise;
        }

        function recommendRecipe(recipeId) {
            var def = $q.defer();

            $http.get(CONFIG.SERVICE_URL.RECOMMEND_RECIPE+"/"+recipeId).success(function(data){
                def.resolve(true);
            }).error(function(err){
                def.resolve(false);
                console.log("problem in recommending recipe");
            });

            return def.promise;
        }

        function postComment(recipeId) {
            var $text = $("#commentBox"), def = $q.defer(), content = $text.val();
            if(content) {
                var savedUser = appStore.getFromLocal("userLoggedInStatus");
                if(!savedUser) {
                    var alertPopup = $ionicPopup.alert({
                        title: $filter('translate')('recipe.login_require_title'),
                        template: $filter('translate')('recipe.login_require_description')
                    });
                    alertPopup.then(function(){
                        def.reject(false);
                    });
                } else {
                    $http.post(CONFIG.SERVICE_URL.SUBMIT_COMMENT, {
                        userID: savedUser.userID,
                        name: savedUser.name,
                        recipeID: recipeId,
                        comment: content
                    }).success(function(flag) {
                        if(flag) {
                            $text.val("");
                            def.resolve({
                                "cook": {
                                    "id": savedUser.userID,
                                    "name": savedUser.name
                                },
                                "comment": [content]
                            });
                        }
                    }).error(function(){
                        console.log("problem in adding comment for recipe");
                        def.reject(false);
                    });
                }
            }
            return def.promise;
        }

        function deleteComment(recipeId, time) {
            var def = $q.defer();

            $http.post(CONFIG.SERVICE_URL.DELETE_COMMENT, {
                recipeId: recipeId,
                time: time
            }).success(function(flag){
                def.resolve(flag);
            }).error(function(err) {
                console.log("error in deleting comment");
                def.reject(false);
            });

            return def.promise;
        }

        function getSocialShareButtons() {
            var arr = [], socialMenuList = appStore.getFromAppStore('menuList')[1].menu;

            for(var index= 0, item, len=socialMenuList.length; index<len; index++){
                item = socialMenuList[index];
                arr.push({text: '<div class="item ' + item.className + '">' +
                                    '<i class="icon '+item.icon+'"></i>' +
                                    '<span>'+$filter('capitalize')(item.className)+'</span>'+
                                '</div>'
                });
            }
            return arr;
        }

        function socialShare(event, recipeObj) {
            var $ele = $(event.currentTarget).children();

            if($ele.is(".facebook")) {
                __shareInSocialMedia($ele.parent(), "facebook", recipeObj);
            } else if($ele.is(".google")) {
                __shareInSocialMedia($ele.parent(), "plus", recipeObj);
            }
            return true;
        }

        function validateForm(model) {
            var flag = true, $form = $("#formList");
            if(model.name === "") {
                flag = flag && false;
                $("label.item:eq(0)", $form).addClass("form-error");
            }
            if(model.shortNote === "") {
                flag = flag && false;
                $("label.item:eq(1)", $form).addClass("form-error");
            }
            if(model.origin.length === 0) {
                flag = flag && false;
                $("label.item:eq(2)", $form).addClass("form-error");
            }
            if(model.timing.length === 0) {
                flag = flag && false;
                $("label.item:eq(3)", $form).addClass("form-error");
            }
            if(model.category.length === 0) {
                flag = flag && false;
                $("label.item:eq(4)", $form).addClass("form-error");
            }
            if(model.ingredients.length === 0) {
                flag = flag && false;
                $("label.item:eq(5)", $form).addClass("form-error");
            }
            if(model.fullDescription.length === 0) {
                flag = flag && false;
                $("label.item:eq(6)", $form).addClass("form-error");
            }
            return ($(".form-error",$form).length > 0) ? true : false;
        }

        function submitRecipe(modelObj, cook) {
            var model = {};
            $.extend(true, model, modelObj);
            model.cook = {
                id: cook.id,
                name: cook.name
            };
            model.origin = modelObj.selectedValues.origin;
            model.timing = modelObj.selectedValues.timing;
            model.category = modelObj.selectedValues.category;
            delete model.selectedValues;

            $http.post(CONFIG.SERVICE_URL.SUBMIT_RECIPE, model).success(function(result){
                if(result._id) {
                    var alertPopup = $ionicPopup.alert({
                        title: $filter('translate')('submitRecipe.submit_recipe_success_title'),
                        template: $filter('translate')('submitRecipe.submit_recipe_success_description')
                    });
                    alertPopup.then(function(){
                        $state.go("home.myRecipe");
                    });
                } else {
                    appStore.storeInLocal("draftRecipe", model);
                }
            }).error(function(err){
                appStore.storeInLocal("draftRecipe", model);
                console.log("error in submitting recipe");
            });
        }

        function getAllMyRecipes(userId) {
            var def = $q.defer();

            $http.get(CONFIG.SERVICE_URL.GET_ALL_MY_RECIPE+"/"+userId).success(function(result){
                def.resolve(result || []);
            }).error(function(){
                console.log("error in fetching all my recipes");
                def.resolve([]);
            });

            return def.promise;
        }

        function __shareInSocialMedia($ele, socialMedia, recipeObj) {
            if(!$ele.hasClass("share")) {
                $ele.addClass("share s_"+socialMedia);
                $ele.ShareLink({
                    title: CONFIG.APP_INFO.APP_NAME+" "+recipeObj.title,
                    url: CONFIG.SERVICE_URL.SHARE_RECIPE_IN_SOCIAL+"/"+recipeObj._id,
                    image: CONFIG.MEDIA_PATH+recipeObj.media,
                    text: CONFIG.APP_INFO.APP_NAME+" "+recipeObj.title,
                    width: 320,
                    height: 400
                });
                $ele.trigger("click");
            }
        }

        function __getBase64FormatOfImg(url) {
            var img = new Image(), def = $q.defer();
            img.crossOrigin = 'Anonymous';
            img.onload = function(){
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                var dataURL = canvas.toDataURL();
                canvas = null;
                def.resolve(dataURL);
            };
            img.src = url;

            return def.promise;
        }

        return {
            getFullCategorizedRecipeList: getFullCategorizedRecipeList,
            getPDFDocDefinition: getPDFDocDefinition,
            getSavedRecipeList: getSavedRecipeList,
            recommendRecipe: recommendRecipe,
            postComment: postComment,
            deleteComment: deleteComment,
            getSocialShareButtons: getSocialShareButtons,
            socialShare: socialShare,
            validateForm: validateForm,
            submitRecipe: submitRecipe,
            getAllMyRecipes: getAllMyRecipes
        };

    };

    factory.$inject = ['$http', '$q', 'CONFIG', '$ionicLoading', '$filter', 'appStore', '$ionicPopup', '$state'];
    return factory;
});