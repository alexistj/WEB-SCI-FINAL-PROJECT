(function () {
    'use strict';

    angular
        .module('app')
        .controller('GamesContribute.IndexController', Controller);

    function Controller($state, $http, $scope, $localStorage, AuthenticationService) {
        var vm = this;
        initController();

        function initController() {

        }

        $scope.submit = function () {

          if (!window.localStorage.getItem('ngStorage-currentUser')) {
            alert("Please login to submit a question");
          }
          if (typeof $scope.question === "undefined" || $scope.question.length < 10) {
              alert("Please enter a question");
              return false;
          }

          else if (typeof $scope.answer === "undefined") {
              alert("Please select an answer");
              return false;
          }

          else {

             //Make api call which will return all the JSON to twitter.json so the ajax can read and format

              var numAns = 0;
              if($scope.answer == "Array") {
                  numAns =0;
              }
              else if($scope.answer == "Vector") {
                  numAns=1;
              }
              else if($scope.answer == "Singly Linked List") {
                 numAns=2 ;
              }
              else if($scope.answer == "Doubly Linked List") {
                  numAns=3 ;
              }
              else if($scope.answer == "Hash Map") {
                  numAns=4 ;
              }
              else if($scope.answer == "Queue") {
                  numAns=5 ;
              }
              else if($scope.answer == "Stack") {
                  numAns=6 ;
              }

              var req = {"contri": JSON.parse(window.localStorage.getItem('ngStorage-currentUser')).username, "q":$scope.question,"a": numAns};
              console.log(req);

              $http.post(API + '/runtime/postQuestions/', req).then(function(response) {
                var results = response.data;
                alert("Question successfully added!");
                console.log(responseData);
              });
            }
          }
        }
})();
