(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
         $urlRouterProvider.otherwise("/");

        // .state('dashboard', {
        //     url: '/dashbaord/:userId',
        //     css: '',
        //     templateUrl: 'splash/index.view.html',
        //     controller: 'Splash.IndexController',
        //     controllerAs: 'vm'
        //   })

        // app routes
        $stateProvider
            .state('splash', {
                url: '/',
                css: '',
                templateUrl: 'splash/index.view.html',
                controller: 'Splash.IndexController',
                controllerAs: 'vm'
              })
            .state('dashboard', {
                url: '/dashboard',
                css: '',
                templateUrl: 'dashboard/index.view.html',
                controller: 'Dashboard.IndexController',
                controllerAs: 'vm'
              })
            .state('topics', {
                url: '/topics',
                css: '',
                templateUrl: 'topics/topicMain/index.view.html',
                controller: 'TopicMain.IndexController',
                controllerAs: 'vm'
              })
            .state('topicArray', {
                url: '/topics/arrays',
                css: '',
                templateUrl: 'topics/topicArray/index.view.html',
                controller: 'TopicArray.IndexController',
                controllerAs: 'vm'
              })

            .state('test1', {
                url: '/test1',
                css: '',
                templateUrl: 'dragNdrop/test1/index.view.html',
                controller: 'Test1.IndexController',
                controllerAs: 'vm'
              });
    }

    function run($rootScope, $http, $location, $localStorage) {

        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // // redirect to login page if not logged in and trying to access a restricted page
        // $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //     var publicPages = ['/login'];
        //     var restrictedPage = publicPages.indexOf($location.path()) === -1;
        //     if (restrictedPage && !$localStorage.currentUser) {
        //         $location.path('/login');
        //     }
        // });
    }
})();
