(function () {
    'use strict';

    angular
        .module('app')
        .controller('Test3Q1.IndexController', Controller);

    function Controller($state, $scope, $location, $localStorage, AuthenticationService) {
        var vm = this;

        // vm.login = login;
        // vm.register = register;

        initController();

        function initController() {
            // reset login status
            vm.loggedIn = false;

            if ($localStorage.currentUser) {
              vm.loggedIn = true;
              vm.username = $localStorage.currentUser.username;
              console.log($localStorage.currentUser);
            }
        };

        function login() {
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
        //
        // function register() {
        //     console.log("called sign up");
        //     vm.loading = true;
        //     AuthenticationService.Register(vm.registerEmail, vm.registerUsername, vm.registerPassword, vm.confirmPassword, function (result) {
        //         if (result === true) {
        //             vm.loading = false;
        //             $state.go('login');
        //         } else {
        //             vm.error = 'Ensure all fields are filled out';
        //             vm.loading = false;
        //         }
        //     });
        // };
    }

})();