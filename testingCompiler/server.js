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
