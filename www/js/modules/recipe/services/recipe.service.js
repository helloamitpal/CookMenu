define(['angular', 'underscore'], function (angular,_) {
    "use strict";

    var factory = function ($http, $q, CONFIG) {

        function addToFavorite(evt) {
            var $ele = $(evt.currentTarget);
            if($ele.hasClass("favorite-item")) {
                $ele.removeClass("favorite-item");
            } else {
                $ele.addClass("favorite-item");
            }
        }

        function getFullCategorizedRecipeList(key, categoryName) {
            var def = $q.defer();
            $http.get(CONFIG.SERVICE_URL.ALL_RECIPE).success(function(data) {
                var allRecipeList = (data || []);
                var allRelatedRecipeList = _.filter(allRecipeList, function(obj) {
                    return (obj[key].indexOf(categoryName) >= 0);
                });
                def.resolve(allRelatedRecipeList);
            }).error(function(err) {
                console.log("Problem in categorized recipes loading:"+err);
                def.resolve([]);
            });
            return def.promise;
        }

        return {
            addToFavorite: addToFavorite,
            getFullCategorizedRecipeList: getFullCategorizedRecipeList
        };

    };

    factory.$inject = ['$http', '$q', 'CONFIG'];
    return factory;
});