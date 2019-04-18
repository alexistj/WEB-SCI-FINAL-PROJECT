(function () {
    'use strict';

    angular
        .module('app')
        .controller('runTime.IndexController', Controller);

    function Controller($state, $scope, $location, $localStorage, AuthenticationService) {
        var vm = this;

        initController();

        function initController() {

        };

    }

})();
