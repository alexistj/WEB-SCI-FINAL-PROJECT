(function () {
    'use strict';

    angular
        .module('app')
        .constant('API', 'http://localhost:3000')
        .component('compiler', {
          bindings: {
            topic: '@',
            questionNum: '@'
          },

          template: `
            <form name="codeInput" method="post" action="compilecode">
              <p>{{$ctrl.question}}</p>
              <h3>Code</h3>
              <button class="btn-primary" ng-href="#here" ng-click="$ctrl.checkCode()">Run >></button>
              <textarea id="code" name="code"></textarea>
              <br/>
              Compile With Input :
              <label><input type="radio" name="consoleInput" ng-change="$ctrl.input=true" ng-model="$ctrl.input" value="true" />Yes</label>
              <label><input type="radio" name="consoleInput" ng-change="$ctrl.input=false" ng-model="$ctrl.input" value="false" checked="checked"/>No</label>
              <h3 ng-show="$ctrl.input">Input</h3>
              <textarea ng-show="$ctrl.input" id="input" name="input" class="form-control" style="min-width: 100%"></textarea>
              <br/>

              <br/>
            </form>
          `,
          controller: function($http) {
            this.input = false;

            this.getQuestion = function() {
              $http.get('API' + '/retrieveQuestion/' + this.topic + "/" + this.questionNum).then(function(data) {

                  // Initialize the question as well as the test inputs for this question
                  this.question = data.data[0].description;
                  this.testInputs = data.data[0].testInputs;
                  this.testOuputs = data.data[0].testOuputs;

                  // Add starter code to the text area
                  document.getElementById("code").innerHTML = "#include<iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n";
                  // This is for question specific code
                  document.getElementById("code").innerHTML += "    " + data.data[0].inputType + " x;\n";
                  document.getElementById("code").innerHTML += "    cin >> x;\n\n    return 0;\n}";
              });
            }

            this.checkCode = function() {

                // Format the inputted code to be JSON-friendly
                var editedText = document.getElementById("code").value.replace(/(\n)/gm, "\\n").replace(/(\")/gm, "\\\"");
                var text = '{ "code":"' + editedText + '" } ';

                $http.post('API' + '/compilecode/' + this.topic + "/" + this.questionNum, text).then(function(data) {
                    var body = document.getElementsByTagName("center")[0];
                    // Output each test with the outputs and expected outputs
                    for (var i = 0; i < this.testOuputs.length; i++) {
                        var input = document.createElement("p");
                        input.innerHTML = "Input: " + this.testInputs[i];
                        var userOutput = document.createElement("p");
                        userOutput.innerHTML = "Your output: " + data.data[i].output;
                        var expectedOutput = document.createElement("p");
                        expectedOutput.innerHTML = "Expected output: " + this.testOuputs[i]

                        body.appendChild(input);
                        body.appendChild(userOutput);
                        body.appendChild(expectedOutput);

                    }
                });
            }
          }
        });
})();
