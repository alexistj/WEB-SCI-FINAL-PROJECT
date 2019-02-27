app.controller('myCtrl', ['$scope','$http', function($scope, $http) {

    $http.get('http://localhost:8080/questions.json').then(function(data) {
        $scope.questionNumber = Math.floor((Math.random() * data.data.questions.length));
        $scope.question = data.data.questions[$scope.questionNumber].description;
        $scope.testInputs = data.data.questions[$scope.questionNumber].testInputs;
        $scope.testOuputs = data.data.questions[$scope.questionNumber].testOuputs;
    });

    $scope.checkCode = function() {
        /*
        var text = '{ "employees" : [' +
        '{ "firstName":"John" , "lastName":"Doe" },' +
        '{ "firstName":"Anna" , "lastName":"Smith" },' +
        '{ "firstName":"Peter" , "lastName":"Jones" } ]}';
        */

        var editedText = document.getElementById("code").value.replace(/(\n)/gm, "\\n");

        var text = '{ "code":"' + editedText + '" } ';

        $http.post("http://localhost:8080/compilecode/" + $scope.questionNumber, text).then(function(data) {
            console.log(data);
            var body = document.getElementsByTagName("center")[0];
            for (var i = 0; i < $scope.testOuputs.length; i++) {
                var input = document.createElement("p");
                input.innerHTML = "Input: " + $scope.testInputs[i];
                var userOutput = document.createElement("p");
                userOutput.innerHTML = "Your output: " + data.data[i].output;
                var expectedOutput = document.createElement("p");
                expectedOutput.innerHTML = "Expected output: " + $scope.testOuputs[i]

                body.appendChild(input);
                body.appendChild(userOutput);
                body.appendChild(expectedOutput);

            }
        });
    }

}]);
