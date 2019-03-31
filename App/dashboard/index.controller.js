(function () {
    'use strict';

    angular
        .module('app')
        .controller('Dashboard.IndexController', Controller);

    function Controller($state, $scope, $localStorage, AuthenticationService) {
        var vm = this;

        initController();

        function initController() {

            vm.loggedIn = false;
            
            // set the user for the page if they're loggin in
            if ($localStorage.currentUser) {
              vm.loggedIn = true;
              vm.username = $localStorage.currentUser.username
            }
        };

        // function login() {
        //     console.log("called login");
        //     vm.loading = true;
        //     AuthenticationService.Login(vm.username, vm.password, function (result) {
        //         if (result === true) {
        //             $state.go('home');
        //         } else {
        //             vm.error = 'Username or password is incorrect';
        //             vm.loading = false;
        //         }
        //     });
        // };
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
