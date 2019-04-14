var express = require('express');
var path = require('path');
var app = express();
const MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser());

// Mongo connection
const CONNECTION_URL = "mongodb+srv://admin:adminpassword@cluster0-f0kkf.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "questions";

//compileX
var compiler = require('compilex');
var option = {stats : true};
compiler.init(option);

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }

    database = client.db(DATABASE_NAME);
    console.log("Connected to `" + DATABASE_NAME + "`!");

	/*
	var myobj = [
		{
            "description": "Write a program that squares an input.",
            "testInputs": ["-5", "0", "1", "10", "123"],
            "testOuputs": ["25", "0", "1", "100", "15129"],
            "inputType": "int",
			"num": 0
        },
        {
            "description": "Write a program that multiplies an input by 10.",
            "testInputs": ["-3", "3", "9", "10", "0"],
            "testOuputs": ["-30", "30", "90", "100", "0"],
            "inputType": "int",
			"num": 1
        },
        {
            "description": "Write a program that adds 10 to an input.",
            "testInputs": ["-5", "0", "1", "10", "123"],
            "testOuputs": ["5", "10", "11", "20", "133"],
            "inputType": "int",
			"num": 2
        },
        {
            "description": "Write a program that appends \"Hi \" to the beginning of the string and an exclamation point at the end.",
            "testInputs": ["Justin", "Alexis", "Jenny", "Aaron"],
            "testOuputs": ["Hi Justin!", "Hi Alexis!", "Hi Jenny!", "Hi Aaron!"],
            "inputType": "string",
			"num": 3
        }
	];

	database.collection("compilerQuestions").insertMany(myobj, function(err, res) {
    	if (err) throw err;
    	console.log("Number of documents inserted: " + res.insertedCount);
  	});
	*/

	app.get('/' , function (req , res ) {
		// Uses our made HTML file for the frontend
		res.sendfile( __dirname + "/index.html");
	});

	app.get('/retrieveQuestion/:topic/:questionNum', function(req,res) {
		var count = parseInt(req.params.questionNum, 10);
		var query = { num: count };
		database.collection(req.params.topic).find(query).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
        });
    });

	app.post('/compilecode/:topic/:questionNum' , function (req , res, next ) {

		var count = parseInt(req.params.questionNum, 10);
		var query = { num: count };
		database.collection(req.params.topic).find(query).toArray(function(err, result) {
            if (err) throw err;
			var allResults = [];
			// Reformat the code for processing
			var code = req.body.code.replace(/(\\n)/gm, "\n");


			// Begins the compilation. There will always be 5 inputs, and this is to
			// maintain it being synchronous
			var envData = { OS : "windows" , cmd : "g++", options: {timeout:5000 } };
			compiler.compileCPPWithInput(envData , code , result[0]["testInputs"][0] , function (data) {
				// Each of these adds the data to the list of results to return
				allResults.push(data);
				compiler.compileCPPWithInput(envData , code , result[0]["testInputs"][1] , function (data) {
					allResults.push(data);
					compiler.compileCPPWithInput(envData , code , result[0]["testInputs"][2] , function (data) {
						allResults.push(data);
						compiler.compileCPPWithInput(envData , code , result[0]["testInputs"][3] , function (data) {
							allResults.push(data);
							compiler.compileCPPWithInput(envData , code , result[0]["testInputs"][4] , function (data) {
								allResults.push(data);

								// Sends the results to Angular
								res.send(allResults);
							});
						});
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
