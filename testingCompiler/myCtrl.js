app.controller('myCtrl', ['$scope','$http', function($scope, $http) {

    $http.get('http://localhost:8080/questions.json').then(function(data) {
        // Initialize the question as well as the test inputs for this question
        $scope.questionNumber = Math.floor((Math.random() * data.data.questions.length));
        $scope.question = data.data.questions[$scope.questionNumber].description;
        $scope.testInputs = data.data.questions[$scope.questionNumber].testInputs;
        $scope.testOuputs = data.data.questions[$scope.questionNumber].testOuputs;

        // Add starter code to the text area
        document.getElementById("code").innerHTML = "#include<iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n";
        // This is for question specific code
        document.getElementById("code").innerHTML += "    " + data.data.questions[$scope.questionNumber].inputType + " x;\n";
        document.getElementById("code").innerHTML += "    cin >> x;\n\n    cout << x;\n    return 0;\n}";

    });

    $scope.checkCode = function() {

        // Format the inputted code to be JSON-friendly
        var editedText = document.getElementById("code").value.replace(/(\n)/gm, "\\n").replace(/(\")/gm, "\\\"");
        var text = '{ "code":"' + editedText + '" } ';

        $http.post("http://localhost:8080/compilecode/" + $scope.questionNumber, text).then(function(data) {
            var body = document.getElementsByTagName("center")[0];
            // Output each test with the outputs and expected outputs
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
