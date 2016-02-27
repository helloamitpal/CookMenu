define(function () {
    'use strict';

    function RecipeController($ionicActionSheet, $scope, CONFIG, appStore, recipeService, commonService, $ionicPopup, $filter) {

        var savedRecipes = appStore.getFromLocal("savedRecipes"),
            socialShareButtons = recipeService.getSocialShareButtons();

        $scope.imagePath = CONFIG.MEDIA_PATH;
        $scope.recipe = appStore.getFromAppStore(CONFIG.CURRENT_RECIPE_ATTR);
        $scope.maxCommentCharLimit = CONFIG.COMMENT_MAX_CHAR_LIMIT;
        $scope.isSaved = (savedRecipes && savedRecipes.hasOwnProperty("savedItems_"+$scope.recipe._id));
        $scope.comments = $scope.recipe.comments.slice().reverse();

        $scope.addToFavorite = commonService.addRemoveFavorite;
        appStore.removeFromAppStore(CONFIG.CURRENT_RECIPE_ATTR);

        $scope.downloadPdf = function() {
            recipeService.getPDFDocDefinition($scope.recipe).then(function(docDefinition){
                pdfMake.createPdf(docDefinition).download($scope.recipe.title+'.js');
            });
        };

        $scope.recommendRecipe = function(recipeId) {
            var confirmPopup = $ionicPopup.confirm({
                title: $filter('translate')('recipe.recommend_confirm_title'),
                template: $filter('translate')('recipe.recommend_confirm_description')
            });

            confirmPopup.then(function(res) {
                if(res) {
                    recipeService.recommendRecipe(recipeId).then(function(flag){
                        if(flag) {
                            $scope.recipe.recommended = (+$scope.recipe.recommended)+1;
                        }
                    });
                }
            });
        };

        $scope.submitComment = function(recipeId){
            recipeService.postComment(recipeId).then(function(textObj){
                $scope.comments.unshift(textObj);
            });
        };

        $scope.openSocialShare = function() {
            var actionSheet = $ionicActionSheet.show({
                buttons: socialShareButtons,
                titleText: $filter('translate')('recipe.action_sheet_title'),
                cancelText: $filter('translate')('recipe.action_sheet_cancel'),
                buttonClicked: function() {
                    recipeService.socialShare(event, $scope.recipe);
                }
            });
        };
    }

    RecipeController.$inject = ['$ionicActionSheet', '$scope', 'CONFIG', 'appStore', 'recipeService','commonService', '$ionicPopup', '$filter'];
    return RecipeController;

});