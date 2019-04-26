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

                tmp.push(integer);
                tmp.push(data[y].username);


                result.push(tmp);


            }

            return (result);





        }

        function sortArray (a,b){
            if (a[0] > b[0]) return -1;
           if (a[0] < b[0]) return 1;
           return 0;

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

                    console.log(res);


                    var inInt = convertToInt(res);
                    inInt.sort(sortArray);




                    if (res.length == 0 ){

                        var text =  document.createElement("p");
                        var textContent = document.createTextNode("No data to show.");

                        text.appendChild(textContent);

                        div.appendChild(text);

                        document.getElementById("leaderboardTable").appendChild(div);

                    } else {

                        var scoreTable = "<table> <tr class='tableHead'> <th>Rank</th> <th>Score</th> <th>Username </th></tr>";



                        for (var x=0; x<res.length; x++){
                            scoreTable += "<tr> <th>" + (x+1) + "</th>";
                            scoreTable += "<th>" + inInt[x][0]+ "</th>";
                            scoreTable += "<th>" + inInt[x][1]+ "</th></tr>";





                        }

                        scoreTable += "</table>";
                        document.getElementById("leaderboardTable").innerHTML= scoreTable;
                    }

                }
                /*var output =" <h1>Leaderboard</h1><ol>";
                while ( i< res.length){
                                output+="<li>"+res[i].username+": "+ res[i].score+"</li> \n";

                                i++;
                }
                 output+= "</ol>";
                document.getElementById("pills-leaderboard").innerHTML = output;

                i=0;

                }*/
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









                    if (res.length == 0 ){

                        var text =  document.createElement("p");
                        var textContent = document.createTextNode("You have not played any games yet.");

                        text.appendChild(textContent);



                        document.getElementById("userScores").appendChild(text);

                    } else {

                        var inInt = convertToInt(res);
                        inInt.sort(sortArray);

                        var scoreTable = "<table> <tr class='tableHead'> <th>Rank</th> <th>Score</th> </tr>";



                        for (var x=0; x<res.length; x++){
                            scoreTable += "<tr> <th>" + (x+1) + "</th>";
                            scoreTable += "<th>" + inInt[x][0]+ "</th></tr>";





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
                    console.log("contributions"); console.log(JSON.parse(window.localStorage.getItem('ngStorage-currentUser')).username);
                    console.log(res);


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
