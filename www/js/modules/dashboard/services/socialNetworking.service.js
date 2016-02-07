define(function () {
    "use strict";

    var factory = function ($auth, $filter, appStore, $http, CONFIG) {

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
                    appStore.storeInLocal("savedRecipes", savedRecipe);
                    appStore.storeInLocal("userLoggedInStatus", userObj);
                    __loggedIn(userObj, provider);
                }).catch(function(response) {
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

        return {
            checkLoginStatus: checkLoginStatus,
            makeLogin: makeLogin
        };
    }

    factory.$inject = ['$auth', '$filter', 'appStore', '$http', 'CONFIG'];
    return factory;
});