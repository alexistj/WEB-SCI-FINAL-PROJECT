(function () {
    'use strict';

    angular
        .module('app')
        .constant('API', 'http://localhost:3000')
        .component('navbar', {
          bindings: {
          },

          template: `
            <nav class="navbar navbar-expand-lg navbar-custom">
              <a class="navbar-brand" href="#/">StartDS</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

            <div class="collapse navbar-collapse">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <a class="nav-link" ng-show="$ctrl.loggedIn" href="#/dashboard">Dashboard<span class="sr-only"></span></a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="#/topics">Topics<span class="sr-only">(current)</span></a>
                </li>
              </ul>
              <ul ng-show="$ctrl.loggedIn" class="navbar-nav ml-auto">
                <li class="nav-item active">
                 <a class="nav-link"> Welcome, {{ $ctrl.username }} </a>
               </li>
               <button class="btn btn-danger my-2 my-sm-0" ng-click="$ctrl.logout();" >Logout</button>
              </ul>
              <ul ng-show="!$ctrl.loggedIn" class="navbar-nav ml-auto">
                <form class="form-inline">
                  <div class="form-group mb-2">
                    <input required class="form-control mr-sm-3" type="text" ng-model="$ctrl.username" placeholder="Username" aria-label="Username">
                  </div>
                  <div class="form-group mx-sm-3 mb-2">
                    <input required class="form-control mr-sm-3" type="password" ng-model="$ctrl.password" placeholder="Password" aria-label="Password">
                  </div>
                  <div class="form-group mx-sm-3 mb-2">
                  <button class="btn btn-success my-2 my-sm-0" type="submit" ng-click="$ctrl.login();">Login</button>
                  <a href="#/" class="btn btn-success btn-sm-0" style="margin-left: 10px;" role="button">Sign-Up</a>
                </form>
               </li>
              </ul>
            </div>
          </nav>
          `,
          controller: function($state, $scope, $localStorage, AuthenticationService) {
            var self = this
            self.loggedIn = false;
            initController();

            function initController() {

              // set the user for the page if they're loggin in
              if ($localStorage.currentUser) {
                self.loggedIn = true;
                self.username = $localStorage.currentUser.username;
              }
            };

            self.login = function() {
               AuthenticationService.Login(self.username, self.password, function (result) {
                   if (result === true) {
                       $state.reload();
                   } else {
                       this.error = 'Username or password is incorrect';
                       this.loading = false;
                   }
               });
            };

           self.logout = function() {
             AuthenticationService.Logout();
           }
         }
        });
})();
