(function () {
    'use strict';

    angular
        .module('app')
        .controller('TopicLinkedLists.IndexController', Controller);

    function Controller($state, $scope, $location, $localStorage, AuthenticationService) {
        var vm = this;

        initController();

        function initController() {

        };

    }

})();
