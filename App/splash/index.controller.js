(function () {
    'use strict';

    angular
        .module('app')
        .controller('Splash.IndexController', Controller);

    function Controller($state, AuthenticationService) {
        var vm = this;

        vm.login = login;
        vm.register = register;

        initController();

        function initController() {
            // reset login status
            AuthenticationService.Logout();
        };

        function login() {
            console.log("called login");
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    $state.go('home');
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };

        function register() {
            console.log("called sign up");
            vm.loading = true;
            AuthenticationService.Register(vm.email, vm.username, vm.password, function (result) {
                if (result === true) {
                    vm.loading = false;
                    $state.go('login');
                } else {
                    vm.error = 'Ensure all fields are filled out';
                    vm.loading = false;
                }
            });
        };
    }

})();
