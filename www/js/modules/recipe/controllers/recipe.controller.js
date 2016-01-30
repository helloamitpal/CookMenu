define(function () {
    'use strict';

    function RecipeController($scope, CONFIG, appStore, recipeService) {

        $scope.imagePath = CONFIG.MEDIA_PATH;
        $scope.recipe = appStore.getFromAppStore(CONFIG.CURRENT_RECIPE_ATTR);
        $scope.maxCommentCharLimit = CONFIG.COMMENT_MAX_CHAR_LIMIT;

        $scope.addToFavorite = recipeService.addToFavorite;
        $scope.changeCharCount = function(evt) {
            if(evt.keyCode === CONFIG.KEYCODE.DELETE || evt.keyCode === CONFIG.KEYCODE.BACKSPACE) {
                $scope.maxCommentCharLimit = (CONFIG.COMMENT_MAX_CHAR_LIMIT - $(evt.currentTarget).val().length);
            } else {
                (($scope.maxCommentCharLimit > 0) ? $scope.maxCommentCharLimit-- : 0);
            }
        };
        $scope.downloadPdf = function() {
            recipeService.getPDFDocDefinition($scope.recipe).then(function(docDefinition){
                pdfMake.createPdf(docDefinition).download();
            });
        };
    }

    RecipeController.$inject = ['$scope', 'CONFIG', 'appStore', 'recipeService'];
    return RecipeController;

});