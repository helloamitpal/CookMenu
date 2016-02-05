define(function () {
    "use strict";

    var factory = function (CONFIG, $auth, $filter, appStore) {

        function __loggedIn(resp, providerName) {
            var $social = $("#menuSection ."+providerName), $userInfo = $("#userInfo");
            console.log(providerName+" user is logged in");
            $social.children("span").text($filter('translate')('menu.'+providerName.toUpperCase()+'_LOGOUT'));
            $social.siblings().hide();

            $("#userName").html(resp.name);
            $("#userCity").html(resp.location);
            $(".icon", $userInfo).hide();
            $userInfo.prepend("<img src='"+resp.picture+"' class='icon' />");
        }

        function __logOut(provider) {
            var $userInfo = $("#userInfo"), $social = $("#menuSection ."+provider);
            console.log("successfully logged out from fb");
            $auth.logout();

            $("#userName", $userInfo).text($filter('translate')('menu.GUEST'));
            $(".icon", $userInfo).show();
            $("img", $userInfo).remove();

            $social.children("span").text($filter('translate')('menu.'+provider.toUpperCase()+'_LOGIN'));
            $social.siblings().show();

            appStore.removeFromLocal("userLoggedInStatus");
        }

        function makeLogin(provider) {
            var savedUser = appStore.getFromLocal("userLoggedInStatus");
            if(savedUser) {
                __logOut(provider);
            } else {
                $auth.authenticate(provider).then(function(response){
                    appStore.storeInLocal("userLoggedInStatus", response.data);
                    __loggedIn(response.data, provider);
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

    factory.$inject = ['CONFIG', '$auth', '$filter', 'appStore'];
    return factory;
});