(function () {
    'use strict';

    angular
        .module('app')
        .constant('API', 'http://localhost:3000')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage, API) {
        var service = {};

        service.Login = Login;
        service.Logout = Logout;
        service.Register = Register;

        return service;

        function Login(username, password, callback) {
            $http.post(API + '/login', { username: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        console.log(response.token);
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        function Register(email, username, password, callback) {
            $http.post(API + '/register', { email: email, username: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.success) {
                        console.log("Registration succeeded! Try logging in");
                        // execute callback with true to indicate successful registration
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed registration
                        callback(false);
                    }
                });
        }


        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            console.log("logged out!");
        }
    }
})();
