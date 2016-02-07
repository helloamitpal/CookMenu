define(function () {
    "use strict";

    var factory = function ($http, $q, CONFIG, $ionicLoading, $filter, appStore) {

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
                    title: (CONFIG.APP_NAME+recipe.title),
                    author: recipe.cook.name,
                    keywords: recipe.category.join(" ")
                };
                def.resolve(obj);
            });

            return def.promise;
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
            getSavedRecipeList: getSavedRecipeList
        };

    };

    factory.$inject = ['$http', '$q', 'CONFIG', '$ionicLoading', '$filter', 'appStore'];
    return factory;
});