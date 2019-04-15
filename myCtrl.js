app.controller('myCtrl', ['$scope','$http', function($scope, $http) {

    $http.get('http://localhost:3000/assets/data/questions.json').then(function(data) {
        $scope.questionNumber = Math.floor((Math.random() * data.data.questions.length));
        $scope.question = data.data.questions[$scope.questionNumber].description;
        $scope.testInputs = data.data.questions[$scope.questionNumber].testInputs;
        $scope.testOuputs = data.data.questions[$scope.questionNumber].testOuputs;
    });

    $scope.checkCode = function() {

        var editedText = document.getElementById("code").value.replace(/(\n)/gm, "\\n");

        var text = '{ "code":"' + editedText + '" } ';

        $http.post("http://localhost:3000/games/compiler/compilecode/" + $scope.questionNumber, text).then(function(data) {
            var tableBody = document.getElementById("results");
            tableBody.innerHTML = "";
            for (var i = 0; i < $scope.testOuputs.length; i++) {
              var row = document.createElement("tr");
              var caseNum = document.createElement("th")  ;
              var input = document.createElement("td")
              var userOutput =document.createElement("td")
              var expectedOutput = document.createElement("td")
                caseNum.innerHTML = i+1
                caseNum.setAttribute( 'scope', 'row' );
                input.innerHTML = $scope.testInputs[i];

                userOutput.innerHTML = data.data.results[i].output;
                expectedOutput.innerHTML = $scope.testOuputs[i]
                row.appendChild(caseNum);
                row.appendChild(input);
                row.appendChild(userOutput);
                row.appendChild(expectedOutput);
                tableBody.appendChild(row);
            }
        });
    }

}]);
