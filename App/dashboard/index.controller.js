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


                var output =" <h1>Leaderbaord</h1><ol>";
                while ( i< res.length){
                                output+="<li>"+res[i].username+": "+ res[i].score+"<li>";

                                i++;
                }
                 output+= "</ol>";
                document.getElementById("pills-leaderboard").innerHTML = output;

                i=0;

                }
        });
    }

})();
