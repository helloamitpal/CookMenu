define(function () {
    'use strict';

    function LoginController($scope, $state) {
        
        $scope.login = function () {
            //$state.go('tab.pet-index');            
        };
    }

    LoginController.$inject = ['$scope', '$state'];
    return LoginController;
    
});