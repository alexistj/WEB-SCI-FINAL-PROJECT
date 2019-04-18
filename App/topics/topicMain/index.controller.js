(function () {
    'use strict';

    angular
        .module('app')
        .controller('TopicMain.IndexController', Controller);

    function Controller($state, $scope, $localStorage, AuthenticationService) {
        var vm = this;
        initController();

        function initController() {

        };
    }

})();
