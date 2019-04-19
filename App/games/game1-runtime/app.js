
var app = angular.module("myApp", []).config(function($sceProvider) {
        $sceProvider.enabled(false);
    });
  app.controller('postQuestion', function($scope, $http){

      $scope.submit = function (){

        if (typeof $scope.question === "undefined") {
            alert("Please enter a question");
            return false;
        }

        else if (typeof $scope.answer === "undefined") {
            alert("Please select an answer");
            return false;
        }

        else{

       //Make api call which will return all the JSON to twitter.json so the ajax can read and format

        var numAns = 0;
        if($scope.answer == "Array"){
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
<<<<<<< HEAD:game1-runtime/app.js

        var req = {"q":$scope.question,"a": numAns};


=======
            
        var req = {"contri": JSON.parse(window.localStorage.getItem('ngStorage-currentUser')).username, "q":$scope.question,"a": numAns};
            
           
   
>>>>>>> 9a0db503574bb3b4bc926de57f86f8a2c0c19d1d:App/games/game1-runtime/app.js
        $.ajax({
            
            
                    type: "POST",
                    url: "http://localhost:3000/runtime/postQuestions/",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(req),
                    success: function(responseData, status){
                        alert("Question successfully added!");
                        console.log(responseData);
                    }
        });

      }
    };

  });
