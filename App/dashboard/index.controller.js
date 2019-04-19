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




        function convertToInt(data){

            var result = [];
            for (var y=0; y<data.length; y++ ){
                var tmp = [];
                var text= data[y].score;
                var integer = parseInt(text, 10);

                result.push(integer);

            }

            return (result);

            



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
                  /*console.log("Hello?");

                    document.getElementById("userScores").innerHTML = '';



                var output =" <h1>My Scores</h1><ol>";
                while ( i< res.length){
                                output+="<li>"+ res[i].score+"</li> \n";

                                i++;
                }
                 output+= "</ol>";
                document.getElementById("pills-scores").innerHTML = output;

                i=0;*/



                       
                     var inInt = convertToInt(res);
                     inInt.sort(function(a, b){return b-a});




                    if (res.length == 0 ){

                        var text =  document.createElement("p"); 
                        var textContent = document.createTextNode("You have not played any games yet."); 

                        text.appendChild(textContent);

                        div.appendChild(text);

                        document.getElementById("userScores").appendChild(div);

                    } else {

                        var scoreTable = "<table> <tr id='tableHead'> <th>Rank</th> <th>Score</th> </tr>";



                        for (var x=0; x<res.length; x++){
                            scoreTable += "<tr> <th>" + (x+1) + "</th>";
                            scoreTable += "<th>" + inInt[x]+ "</th></tr>";
            


                            

                        }

                        scoreTable += "</table>";
                        document.getElementById("userScores").innerHTML= scoreTable;
                    }

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
