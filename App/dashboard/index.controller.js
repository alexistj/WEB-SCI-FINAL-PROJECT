(function () {
    'use strict';

    angular
        .module('app')
        .controller('Dashboard.IndexController', Controller);

    function Controller($state, $scope, $localStorage, AuthenticationService) {
        var vm = this;
        // vm.logout = logout;
        // vm.login = login;
        //
        // initController();
        //
        // function initController() {
        //
        //     vm.loggedIn = false;
        //
        //     // set the user for the page if they're loggin in
        //     if ($localStorage.currentUser) {
        //       vm.loggedIn = true;
        //       vm.username = $localStorage.currentUser.username;
        //       console.log(vm.username, "is logged in on Dashboard");
        //     }
        // };
        //
        // function login() {
        //     console.log("called login");
        //     vm.loading = true;
        //     console.log(vm.username, vm.password);
        //     AuthenticationService.Login(vm.username, vm.password, function (result) {
        //         if (result === true) {
        //             $state.reload();
        //         } else {
        //             vm.error = 'Username or password is incorrect';
        //             vm.loading = false;
        //         }
        //     });
        // };
        //
        // function logout() {
        //   AuthenticationService.Logout();
        // }
        
        
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
