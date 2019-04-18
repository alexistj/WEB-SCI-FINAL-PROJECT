const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const request    = require('request');
const fs         = require('fs');
const passport 	 = require('passport');
const mongoose 	 = require('mongoose');
const cors       = require('cors');
const port = 3000;


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

//Configure compileX
const compiler = require('compilex');
var option = {stats : true};
compiler.init(option);


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
        console.log(code);
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
                            console.log(allResults);
                            res.send(allResults)
                        });
                    });
                });
            });
        });
    });
});

//  Serve static files like CSS to Express
app.listen((process.env.port || 3000), () => console.log(`startDS listening on port ${port}!`))
