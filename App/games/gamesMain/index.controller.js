(function () {
    'use strict';

    angular
        .module('app')
        .controller('GamesMain.IndexController', Controller);

    function Controller($state, $scope, $localStorage, AuthenticationService) {
        var vm = this;
        initController();

        function initController() {

        };
    }

})();