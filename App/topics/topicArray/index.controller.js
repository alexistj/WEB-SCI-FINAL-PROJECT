(function () {
    'use strict';

    angular
        .module('app')
        .controller('TopicArray.IndexController', Controller);

    function Controller($state, $scope, $location, $localStorage, AuthenticationService) {
        var vm = this;


        initController();

        function initController() {

        };
    }

})();
