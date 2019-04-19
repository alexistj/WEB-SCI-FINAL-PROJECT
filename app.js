const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const request    = require('request');
const fs         = require('fs');
const passport 	 = require('passport');
const mongoose 	 = require('mongoose');
const cors       = require('cors');
const port = 3000;
const {c, cpp, node, python, java} = require('compile-run');



// env variables
require('dotenv').config();

//Configure mongoose's promise to global promise
var Mongoose = require('mongoose').Mongoose;
mongoose.promise = global.Promise;

// Configure Mongooose and MongoDBAtlas connection
const uri = `mongodb+srv://${ process.env.DBUSER }:${ process.env.DBPASSWORD }@cluster0-yvtgu.mongodb.net/test?retryWrites=true`;


mongoose.connect(uri,
  {useNewUrlParser: true,
   useFindAndModify : false,
   useCreateIndex : true,
   dbName: 'startDS'});
const db = mongoose.connection;

var instance2 = new Mongoose();
instance2.connect(uri,
  {useNewUrlParser: true,
   useFindAndModify : false,
   useCreateIndex : true,
   dbName: 'compilerQuestions'});
const dbQuestions = instance2.connection;


var instance3 = new Mongoose();
instance3.connect(uri,
  {useNewUrlParser: true,
   useFindAndModify : false,
   useCreateIndex : true,
   dbName: 'runtime'});
const dbRuntime = instance3.connection;


//Initiate app
const app = express();

// Configure the app
app.set('secret', process.env.SECRET); // secret variable

// serve static files from current directory
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

process.on('uncaughtException', function (err) {
  // This should not happen
  console.log("Something unexpected happened. This should be handled more gracefully. The culprit is: ", err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.message);
});

// Models and routes
require('./models/User');
require('./config/passport');

app.get('/retrieveQuestion/:topic/:questionNum', function(req,res) {
    var count = parseInt(req.params.questionNum, 10);
    var query = { num: count };
    dbQuestions.collection(req.params.topic).find(query).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/compilecode/:topic/:questionNum' , function (req , res, next ) {

    var count = parseInt(req.params.questionNum, 10);
    var query = { num: count };
    dbQuestions.collection(req.params.topic).find(query).toArray(function(err, result) {
        if (err) throw err;
        var allResults = [];

        // Reformat the code for processing
        var code = req.body.code.replace(/(\\n)/gm, "\n");


        // Create test cases from the retrieved document
        var tests = []
        for (var i=0; i < result[0]["testInputs"].length; i++) {
         tests.push( {
              input: result[0]["testInputs"][i],
              expected: result[0]["testOutputs"][i]
          });
        };

        // Function to run code
        async function runCodeWithInput(test) {

          // Run C++ code with input asynchronously
          // The code will return a promise when it is finished running
          await cpp.runSource(code, { stdin: test.input }, (err, result) => {
            if(err){
                  new Promise(resolve => setTimeout(resolve, 300));
              }
              else{
                  allResults.push( { test: test , result: result });
                  new Promise(resolve => setTimeout(resolve, 300));
              }
          });
        }


        async function processTests(array) {

          // map array to promises
          const promises = array.map(runCodeWithInput);

          // wait until all promises are resolved
          await Promise.all(promises);

          // Send the code results to the user once complete
          res.send(allResults);
        }

        // Run all test inputs on the code
        processTests(tests);
    });
});




app.get('/runtime/getQuestions', function(req,res) {

    dbRuntime.collection("questions").aggregate( [ { $sample: { size: 5 } } ]).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/runtime/getContributions/:user', function(req,res) {
    dbRuntime.collection("questions").find({ contri: req.params.user }).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})
app.post('/runtime/sendScore/:username/:score', function(req,res) {
    var info = req.params;
    console.log(info);
    dbRuntime.collection("leaderBoard").insertOne({ username: info.username, score: info.score },function(err, info){
        if (err) throw err;
        res.send("score successfully added");
    });
});


app.post('/runtime/postQuestions', function(req,res) {
    var info = JSON.parse(JSON.stringify(req.body));
    dbRuntime.collection("questions").insertOne({contri:info.contri , q:info.q, a: info.a},function(err, info){
        if (err) throw err;
        res.send("question successfully added");
    });
});

app.get('/runtime/getleaderboard', function(req,res) {
 dbRuntime.collection("leaderBoard").find().sort({score:-1}).limit(10).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})


app.get('/runtime/getScores/:username', function(req,res) {
  dbRuntime.collection("leaderBoard").find( { "username": req.params.username } ).sort({score:-1}).limit(10).toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
      });
});

app.get('/runtime/contributions/:username', function(req,res) {
    dbRuntime.collection("questions").find( { "contri": req.params.username } ).limit(10).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.send(result);
      });
});




//  Serve static files like CSS to Express
app.listen((process.env.port || 3000), () => console.log(`startDS listening on port ${port}!`))
