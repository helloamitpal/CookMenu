define(function () {
    'use strict';

    return ['recipeService', '$filter', '$ionicPopup', 'appStore', function(recipeService, $filter, $ionicPopup, appStore) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: "templates/recipe/comments.html",
            scope: {
                comments: "=",
                recipeId: "="
            },
            link: function($scope) {

                var savedUser = appStore.getFromLocal("userLoggedInStatus");
                $scope.userId = ((savedUser) ? savedUser.userID : "");

                $scope.deleteComment = function(evt, index, time) {
                    evt.preventDefault();
                    evt.stopImmediatePropagation();

                    var confirmPopup = $ionicPopup.confirm({
                        title: $filter('translate')('recipe.remove_comment_confirm_title'),
                        template: $filter('translate')('recipe.remove_comment_confirm_description')
                    });

                    confirmPopup.then(function(res) {
                        if(res) {
                            recipeService.deleteComment($scope.recipeId, time).then(function(flag){
                                if(flag) {
                                    $scope.comments.splice(index, 1);
                                }
                            });
                        }
                    });
                };
            }
        };
    }];
});