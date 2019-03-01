const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const request    = require('request');
const fs         = require('fs');
const app = express()
const router = express.Router();
const port = 3000

//compileX
const compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

app.use('/', router); // Use router for creation of subpaths
app.use(express.static(path.join(__dirname)));
router.use(express.json());

router.get('/', (req, res) => res.sendFile(path.join(__dirname+'/splashPage.html')));
router.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname+'/dashboard.html')));
router.get('/games/compiler', (req, res) => res.sendFile(path.join(__dirname+'/compiler.html')));

router.post('/games/compiler/compilecode/:questionNum' , function (req , res, next ) {
	var obj = JSON.parse(fs.readFileSync('./assets/data/questions.json', 'utf8'));
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

//  Serve static files like CSS to Express
const server = app.listen((process.env.port || 3000), () => console.log(`startDS listening on port ${port}!`))
