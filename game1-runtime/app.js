
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
        else if($scope.answer == "Hashmap") {
           numAns=2 ;    
        }    
        else if($scope.answer == "SSL") {
            numAns=3 ;    
        } 
        else if($scope.answer == "DDL") {
            numAns=4 ;    
        }
            
         console.log(url);   
        var url= "http://localhost:3000/runtime/postQuestions/"+$scope.question+"/"+numAns+"/";
       // $.getJSON(url, function(){});
        console.log(url);
        $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/runtime/postQuestions/"+$scope.question+"/"+numAns+"/",
                    success: function(responseData, status){
                        console.log("SUCCESSSSSS");
                    }});
                        
      }
    };
   
  });
    

