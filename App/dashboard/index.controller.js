(function () {
    'use strict';

    angular
        .module('app')
        .controller('Dashboard.IndexController', Controller);

    function Controller($state, $scope, $localStorage, AuthenticationService) {
        var vm = this;
        vm.logout = logout;
        vm.login = login;

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

        function login() {
            console.log("called login");
            vm.loading = true;
            console.log(vm.username, vm.password);
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    $state.reload();
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };

        function logout() {
          AuthenticationService.Logout();
        }
    }

})();
