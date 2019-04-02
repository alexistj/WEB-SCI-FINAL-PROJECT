(function () {
    'use strict';

    angular
        .module('app')
        .controller('Dashboard.IndexController', Controller);

    function Controller($state, $scope, $localStorage, AuthenticationService) {
        var vm = this;
        vm.logout = Logout;

        initController();

        function initController() {

            vm.loggedIn = false;

            // set the user for the page if they're loggin in
            if ($localStorage.currentUser) {
              vm.loggedIn = true;
              vm.username = $localStorage.currentUser.username;
              console.log(vm.username, "is logged in on Dashboard");
            }
        };

        function Logout() {
          AuthenticationService.Logout();
        }
    }

})();
