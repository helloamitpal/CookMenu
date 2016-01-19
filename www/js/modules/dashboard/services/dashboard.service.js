define(['angular', 'underscore'], function (angular,_) {
    "use strict";

    var factory = function ($rootScope, $http, $q, CONFIG, $state) {

        function titleClickListener() {
            $(document).on("click", "#navBar .title", function(evt) {
                evt.stopImmediatePropagation();
                $rootScope.showSearch = true;
            });
        }

        function getRandomCategoryList() {
            var def = $q.defer();
            $http.get(CONFIG.SERVICE_URL.ALL_CATEGORY).success(function(data){
                def.resolve(_.sample(data.categories, CONFIG.INIT_CATEGORY_COUNT) || []);
            }).error(function(err){
                console.log("Some error occurred in category list fetching"+err);
                def.resolve([]);
            });

            return def.promise;
        }

        function getCategoryList(allList, categories) {
            var categoryList = [];
            var list = _.filter(allList, function(obj) {
                return (_.intersection(categories, obj.category).length > 0);
            });
            list = _.sortBy(list, 'recommended');
            for(var index= 0, len = categories.length; index < len; index++) {
                categoryList.push({
                    categoryName: categories[index],
                    recipes: list.slice(0, CONFIG.INIT_DYNAMIC_RECIPE_COUNT)
                });
            }
            return categoryList;
        }

        function getRecipeList() {
            var def = $q.defer();
            $http.get(CONFIG.SERVICE_URL.ALL_RECIPE).success(function(data) {
                var allRecipeList = (data || []);
                var specialRecipeList = _.filter(allRecipeList, function(obj) {
                    return (obj.isSpecial);
                });

                getRandomCategoryList().then(function(categoryArr) {
                    var categoryList = getCategoryList(allRecipeList, categoryArr);
                    def.resolve({
                        specialRecipeList: specialRecipeList,
                        categoryList: categoryList
                    });
                });
            }).error(function(err) {
                console.log("some error occurred in recipe json loading"+err);
                def.resolve([]);
            });
            return def.promise;
        }

        function addToFavorite(evt) {
            evt.preventDefault();
            evt.stopImmediatePropagation();
            var $ele = $(evt.currentTarget);
            if($ele.hasClass("favorite-item")) {
                $ele.removeClass("favorite-item");
            } else {
                $ele.addClass("favorite-item");
            }
        }

        return {
            titleClickListener: titleClickListener,
            getRecipeList: getRecipeList,
            addToFavorite: addToFavorite
        };

    };

    factory.$inject = ['$rootScope', '$http', '$q', 'CONFIG','$state'];
    return factory;
});