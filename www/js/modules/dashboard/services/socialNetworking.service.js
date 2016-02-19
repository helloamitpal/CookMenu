define(['ngSocial'], function () {
    "use strict";

    var factory = function ($auth, $filter, appStore, $http, CONFIG, $ionicLoading) {

        function __loggedIn(resp, providerName) {
            var $social = $("#menuSection ."+providerName), $userInfo = $("#userInfo");
            console.log(providerName+" user is logged in");
            $social.children("span").text($filter('translate')('menu.'+providerName.toUpperCase()+'_LOGOUT'));
            $social.siblings().hide();

            $("#userName").html(resp.name);
            $("#userCity").html(resp.location);
            $("i.icon.ion-person", $userInfo).hide();
            $("img.icon", $userInfo).show();

            appStore.setToAppStore('userPhoto', resp.picture);
        }

        function __logOut(provider) {
            var savedUser = appStore.getFromLocal("userLoggedInStatus");

            $http.get(CONFIG.SERVICE_URL.LOGOUT_USER+"/"+savedUser.userID).success(function(){
                var $userInfo = $("#userInfo"), $social = $("#menuSection ."+provider);
                console.log("successfully logged out from fb");
                $auth.logout();

                $("#userName").text($filter('translate')('menu.GUEST'));
                $("i.icon.ion-person", $userInfo).show();
                $("img.icon", $userInfo).hide();

                $social.children("span").text($filter('translate')('menu.'+provider.toUpperCase()+'_LOGIN'));
                $social.siblings().show();

                appStore.removeFromLocal("userLoggedInStatus");
            }).error(function() {
                console.log("error in logging out "+provider+" user");
            });
        }

        function makeLogin(provider) {
            var savedUser = appStore.getFromLocal("userLoggedInStatus");
            if(savedUser) {
                __logOut(provider);
            } else {
                $auth.authenticate(provider).then(function(response){
                    var savedRecipe = {}, userObj = response.data;
                    $.extend(true, savedRecipe, userObj.savedRecipes);
                    delete userObj.savedRecipes;

                    var prevSavedRecipes = appStore.getFromLocal("savedRecipes");
                    if(prevSavedRecipes) {
                        __storeMergedRecipes(prevSavedRecipes, savedRecipe, userObj.userID);
                    } else {
                        appStore.storeInLocal("savedRecipes", savedRecipe);
                    }
                    appStore.storeInLocal("userLoggedInStatus", userObj);
                    __loggedIn(userObj, provider);
                }).catch(function() {
                    console.log("error in authenticating "+provider+" user");
                });
            }
        }

        function checkLoginStatus() {
            var savedUser = appStore.getFromLocal("userLoggedInStatus");
            if(savedUser) {
                __loggedIn(savedUser, savedUser.social);
            }
        }

        function __storeMergedRecipes(prevSavedRecipes, newSavedRecipes, userID) {
            var newSavedRecipeIDArr = [];
            for(var attr in prevSavedRecipes) {
                if(!newSavedRecipes.hasOwnProperty(attr)) {
                    newSavedRecipes[attr] = prevSavedRecipes[attr];
                    newSavedRecipeIDArr.push(prevSavedRecipes[attr]._id);
                }
            }
            appStore.storeInLocal("savedRecipes", newSavedRecipes);

            if(newSavedRecipeIDArr.length > 0) {
                $ionicLoading.show();
                $http.post(CONFIG.SERVICE_URL.SET_FAVORITE_RECIPE_BULK+"/"+userID, {
                    data: newSavedRecipeIDArr
                }).success(function(data){
                    $ionicLoading.hide();
                }).error(function() {
                    $ionicLoading.hide();
                    console.log("error in setting recipe as favorites");
                });
            }
        }

        return {
            checkLoginStatus: checkLoginStatus,
            makeLogin: makeLogin
        };
    };

    factory.$inject = ['$auth', '$filter', 'appStore', '$http', 'CONFIG', '$ionicLoading'];
    return factory;
});