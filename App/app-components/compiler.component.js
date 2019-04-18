(function () {
    'use strict';

    angular
        .module('app')
        .component('compiler', {
          bindings: {
            topic: '@',
            questionNum: '@'
          },
          template: `
          <div class="compiler-container">


            <div id="compiler-question" ng-show="description.question"  class="media">
              <div class="media-body">
                <h5 class="mt-0 mb-1">Example:</h5>
                {{ description.question }}
              </div>
            </div>

            <ul class="nav nav-pills mb-3 mr-auto" id="pills-tab" role="tablist">
              <li class="nav-item">
                <span class="nav-link active" id="pills-score-tab" data-toggle="pill"  data-target="#pills-scores" data-toggle="tab" role="tab" aria-controls="pills-scores" aria-selected="true">Code</span>
              </li>
              <li class="nav-item">
                <span class="nav-link" id="pills-leaderboard-tab" data-toggle="pill"  data-target="#pills-leaderboard" data-toggle="tab" role="tab" aria-controls="pills-leaderboard" aria-selected="true">Input</span>
              </li>
              <li class="nav-item">
                <span class="nav-link" id="pills-contributions-tab" data-toggle="pill"  data-target="#pills-contributions" data-toggle="tab" role="tab" aria-controls="pills-contributions" aria-selected="true">Results</span>
              </li>
              <li class="nav-item ml-auto">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
                <button class="btn btn-success my-2 my-sm-0" type="submit" ng-click="$ctrl.checkCode()"> <i class="fa fa-play" aria-hidden="true"></i>   Run </button>
              </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" id="pills-scores" role="tabpanel" aria-labelledby="pills-home-tab">
                <h3>Code:</h3>
                <textarea id="code" name="code"></textarea>
              </div>
              <div class="tab-pane fade" id="pills-leaderboard" role="tabpanel" aria-labelledby="pills-leaderboard-tab">
                <h3>Compile With Input:</h3>
                <textarea id="input" name="input" class="form-control" style="min-width: 100%"></textarea>
              </div>
              <div class="tab-pane fade" id="pills-contributions" role="tabpanel" aria-labelledby="pills-contributions-tab">
                <h3>Results:</h3>
                <div ng-show="error.error" class="alert alert-danger" role="alert">
                  {{ error.error }}
                </div>
                <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Test #</th>
                    <th scope="col">Input</th>
                    <th scope="col">Your Output</th>
                    <th scope="col">Expected</th>
                  </tr>
                </thead>
                <tbody id="results-table">
                </tbody>
              </table>

              </div>
            </div>
          </div>
          `,
          // <form name="codeInput">
          //   <p>{{$ctrl.question}}</p>
          //   <h3>Code</h3>
          //   <button class="btn-primary" ng-click="$ctrl.checkCode()">Run >></button>
          //   <textarea id="code" name="code"></textarea>
          //   <br/>
          //   Compile With Input :
          //   <label><input type="radio" name="consoleInput" ng-change="$ctrl.input=true" ng-model="$ctrl.input" value="true" />Yes</label>
          //   <label><input type="radio" name="consoleInput" ng-change="$ctrl.input=false" ng-model="$ctrl.input" value="false" checked="checked"/>No</label>
          //   <h3 ng-show="$ctrl.input">Input</h3>
          //   <textarea ng-show="$ctrl.input" id="input" name="input" class="form-control" style="min-width: 100%"></textarea>
          //   <br/>
          //   <center></center>
          //   <br/>
          // </form>
          controller: function($http, $scope) {
            var API = 'http://localhost:3000';

            this.getQuestion = function() {
              $http.get(API + '/retrieveQuestion/' + this.topic + "/" + this.questionNum).then(function(data) {

                  // Initialize the question as well as the test inputs for this question
                  $scope.description={"question": data.data[0].description};
                  $scope.question = data.data[0].description;
                  $scope.testInputs = data.data[0].testInputs;
                  $scope.testOutputs = data.data[0].testOutputs;

                  // Add starter code to the text area
                  document.getElementById("code").innerHTML = "#include<iostream>\n#include <string>\n\nusing namespace std;\n\nint main() {\n";

                  // This is for question specific code
                  document.getElementById("code").innerHTML += "    " + data.data[0].inputType + " x;\n";
                  document.getElementById("code").innerHTML += "    cin >> x;\n\n    return 0;\n}";
                  var table = document.getElementById("results-table");

                  // Add input to view
                  // Output each test with the outputs and expected outputs
                  for (var i = 0; i < $scope.testInputs.length; i++) {
                    document.getElementById("input").innerHTML += $scope.testInputs[i] + "\n";
                    var resultRow = document.createElement("tr");
                    var rowHead = document.createElement("th");
                    rowHead.innerHTML = i;
                    var input = document.createElement("td");
                    var out = document.createElement("td");
                    var expect = document.createElement("td");
                    input.innerHTML = $scope.testInputs[i] ;
                    out.innerHTML = "";
                    expect.innerHTML = $scope.testOutputs[i];
                    resultRow.appendChild(rowHead);
                    resultRow.appendChild(input);
                    resultRow.appendChild(out);
                    resultRow.appendChild(expect);
                    table.appendChild(resultRow);
                  }
              });
            }

            this.checkCode = function() {

                // Format the inputted code to be JSON-friendly
                var editedText = document.getElementById("code").value.replace(/(\n)/gm, "\\n").replace(/(\")/gm, "\\\"");
                var text = '{ "code":"' + editedText + '" } ';

                $http.post(API + '/compilecode/' + this.topic + "/" + this.questionNum, text).then(function(response) {
                    $scope.error = null;
                    var results = response.data;

                    var table = document.getElementById("results-table");
                    document.getElementById("input").html = "";
                    table.innerHTML = "";
                    for (var i = 0; i < results.length; i++) {
                      var test = results[i].test;
                      var result = results[i].result;
                      document.getElementById("input").innerHTML += $scope.testInputs[i] + "\n";
                      var resultRow = document.createElement("tr");
                      var rowHead = document.createElement("th");
                      rowHead.innerHTML = i;
                      var input = document.createElement("td");
                      var out = document.createElement("td");
                      var expect = document.createElement("td");
                      input.innerHTML = test.input;
                      if (result.stderr.length > 0) {
                        $scope.error = { "error": result.stderr} ;
                        break;
                      }
                      out.innerHTML = result.stdout;
                      expect.innerHTML = test.expected;
                      resultRow.appendChild(rowHead);
                      resultRow.appendChild(input);
                      resultRow.appendChild(out);
                      resultRow.appendChild(expect);
                      table.appendChild(resultRow);
                    }
                });
            }

            this.description = {"question": null}
            this.input = false;
            this.error = {"error": null};
            this.getQuestion();
          }
        });
})();
