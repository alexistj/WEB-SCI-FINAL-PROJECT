(function () {
    'use strict';

    angular
        .module('app')
        .constant('API', 'http://localhost:3000')
        .factory('AuthenticationService', Service);

    function Service($http, $location, $localStorage, API) {
        var service = {};

        // Function variables
        service.Login = Login;
        service.Logout = Logout;
        service.Register = Register;

        return service;

        // Pull payload from a jwt
        function jwtDecode(t) {
          let token = {};
          token.raw = t;
          var data = t.split('.');
          token.header = JSON.parse(window.atob(data[0]));
          token.payload = JSON.parse(window.atob(data[1]));
          return (token)
        }

        // log a user in
        function Login(username, password, callback) {
            $http.post(API + '/login', { username: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.token) {

                        // decode the JWT to get the user id
                        var decoded = jwtDecode(response.token);

                        // store userId, username, and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { id: decoded.payload.userId, username: username, token: response.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        console.log("Successfully logged in ", $localStorage.currentUser);
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }

        // register a new user
        function Register(email, username, password, passwordConf, callback) {
            $http.post(API + '/register', { email: email, username: username, password: password, passwordConf: passwordConf })
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
            $location.path( "/" );
            console.log("logged out!");
        }
    }
})();
