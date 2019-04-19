(function () {
    'use strict';

    angular
        .module('app')
        .controller('Dashboard.IndexController', Controller);

    function Controller($http, $state, $scope, $localStorage, AuthenticationService) {
        var API = 'http://localhost:3000';


        initController();

        function initController() {
          getContributions();
        }

        function getContributions() {
          var contributionsTab = document.getElementById("pills-contributions");
          var user = window.localStorage.getItem('ngStorage-currentUser');
          $http.get(API + '/runtime/getContributions/'+user).then(function(response) {
            var results = response.data;
            console.log(results);
          });
        }

        var i=0;
        $.ajax({
                type: "GET",
                url: "http://localhost:3000/runtime/getleaderboard",
                async:true,
                dataType: 'json', // added data type
                success: function(res) {


                var output =" <h1>Leaderboard</h1><ol>";
                while ( i< res.length){
                                output+="<li>"+res[i].username+": "+ res[i].score+"</li> \n";

                                i++;
                }
                 output+= "</ol>";
                document.getElementById("pills-leaderboard").innerHTML = output;

                i=0;

                }
        });

        i=0;
        $.ajax({


                type: "GET",
                url: "http://localhost:3000/runtime/getScores/"+JSON.parse(window.localStorage.getItem('ngStorage-currentUser')).username,
                async:true,
                dataType: 'json', // added data type
                success: function(res) {
                    console.log("Hello?");


                var output =" <h1>My Scores</h1><ol>";
                while ( i< res.length){
                                output+="<li>"+ res[i].score+"</li> \n";

                                i++;
                }
                 output+= "</ol>";
                document.getElementById("pills-scores").innerHTML = output;

                i=0;

                }
        });
        
        
        
        
         i=0;
        $.ajax({
            
             
                type: "GET",
                url: "http://localhost:3000/runtime/contributions/"+JSON.parse(window.localStorage.getItem('ngStorage-currentUser')).username,
                async:true,
                dataType: 'json', // added data type
                success: function(res) {
                    console.log("Hello?");

    
                var output ="<h1>My Contributions</h1><ol>";
                while ( i< res.length){
                                output+="<li>"+ res[i].q+"</li> \n";
                                
                                i++;
                }
                 output+= "</ol>";
                document.getElementById("pills-contributions").innerHTML = output;
             
                i=0;
                   
                }
        });
    }

})();
