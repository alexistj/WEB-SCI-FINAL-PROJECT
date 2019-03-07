var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser());

//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

app.get('/' , function (req , res ) {
	// Uses our made HTML file for the frontend
	res.sendfile( __dirname + "/index.html");
});


app.post('/compilecode/:questionNum' , function (req , res, next ) {
	var obj = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
	var inputs = obj.questions[req.params.questionNum].testInputs;

	var allInputs = [];
	var allResults = [];
	var code = req.body.code.replace(/(\\n)/gm, "\n");;
	//console.log(code);
	var envData = { OS : "windows"};

	// Begins the compilation. There will always be 5 inputs, and this is to
	// maintain it being synchronous
	compiler.compilePythonWithInput(envData, code, inputs[0], function(data){
		// Adds the data to the list of results to return
		allResults.push(data);
		compiler.compilePythonWithInput(envData, code, inputs[1], function(data){
			allResults.push(data);
			compiler.compilePythonWithInput(envData, code, inputs[2], function(data){
				allResults.push(data);
				compiler.compilePythonWithInput(envData, code, inputs[3], function(data){
					allResults.push(data);
					compiler.compilePythonWithInput(envData, code, inputs[4], function(data){
						allResults.push(data);

						// Sends the results to Angular
						res.send(allResults);
					});
				});
			});
		});
	});
});

// For getting all the local files
app.get('/myApp.js', function(req, res) {
  res.sendFile(__dirname + "/" + "myApp.js");
});

app.get('/myCtrl.js', function(req, res) {
  res.sendFile(__dirname + "/" + "myCtrl.js");
});

app.get('/questions.json', function(req, res) {
  res.sendFile(__dirname + "/" + "questions.json");
});

app.listen(8080);
