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
            .state('topicTrees', {
                url: '/topics/trees',
                css: '',
                templateUrl: 'topics/topicTrees/index.view.html',
                controller: 'TopicTrees.IndexController',
                controllerAs: 'vm'
              })
            .state('topicLinkedLists', {
                  url: '/topics/linkedLists',
                  css: '',
                  templateUrl: 'topics/topicLinkedLists/index.view.html',
                  controller: 'TopicLinkedLists.IndexController',
                  controllerAs: 'vm'
                })
            .state('games', {
                url: '/games',
                css: '',
                templateUrl: 'games/gamesMain/index.view.html',
                controller: 'GamesMain.IndexController',
                controllerAs: 'vm'
              })
            .state('test1', {
                url: '/topics/test1',
                css: '',
                templateUrl: 'topics/test1/index.view.html',
                controller: 'Test1.IndexController',
                controllerAs: 'vm'
              })

            .state('test2', {
                url: '/topics/test2',
                css: '',
                templateUrl: 'topics/test2/q1/index.view.html',
                controller: 'Test2Q1.IndexController',
                controllerAs: 'vm'
              })
            .state('test3-1', {
                url: '/topics/test3-1',
                css: '',
                templateUrl: 'topics/test3/q1/index.view.html',
                controller: 'Test3Q1.IndexController',
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
