var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
const port = 8080
app.use(bodyParser());
app.use('/', express.static(__dirname));
express.static(path.join(__dirname));

//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));

app.post('/compilecode/:questionNum' , function (req , res, next ) {
	var obj = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
	var inputs = obj.questions[req.params.questionNum].testInputs;
	console.log(inputs[0]);

	var allInputs = [];
	var allResults = [];
	var code = req.body.code.replace(/(\\n)/gm, "\n");;
	//console.log(code);
	var envData = { OS : "windows"};
	var i = 0;
	for (i = 0; i < inputs.length; i++) {
		var currentInput = inputs[i];
		compiler.compilePythonWithInput(envData , code , currentInput , function(data){
			allInputs.push(currentInput);
			console.log(currentInput);
			allResults.push(data);
			if (allResults.length == inputs.length) {
				console.log("done!");
				//res.send(allResults);
				res.json({
					results: allResults,
					inputs: allInputs
				})
			}
		});
	}
	//res.send(allResults);

	/*
	res.json({
    	results: allResults
	});
	*/



	/*
	if(inputRadio === "true") {
		var envData = { OS : "windows"};
		compiler.compilePythonWithInput(envData , code , input , function(data){
			res.send(data);
		});
	} else {
		var envData = { OS : "windows"};
		compiler.compilePython(envData , code , function(data){
			res.send(data);
		});
	}
	*/
});

app.get('/fullStat' , function(req , res ){
	/*
    compiler.fullStat(function(data){
        res.send(data);
    });
	*/
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

app.listen((process.env.port || 8080), () => console.log(`startDS listening on port ${port}!`))
