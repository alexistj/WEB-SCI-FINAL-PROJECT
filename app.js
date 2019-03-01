const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const request    = require('request');
const app = express()
const router = express.Router();
const port = 3000

router.get('/', (req, res) => res.sendFile(path.join(__dirname+'/splashPage.html')));
router.get('/compiler', (req, res) => res.sendFile(path.join(__dirname+'/testingCompiler/index.html')));

app.use('/', router); // Use router for creation of subpaths
router.use(express.json());
app.use(express.static(path.join(__dirname)));

router.get('/search/compliler', function(req, res) {
  console.log(req.params.zip);
  // request({
  //   uri: `http://api.openweathermap.org/data/2.5/weather?zip=${req.params.zip},us&units=metric&appid=dcf3f93e7736297b4f75de91e49d68c8`
  // }).pipe(res);
});

//  Serve static files like CSS to Express
const server = app.listen((process.env.port || 3000), () => console.log(`startDS listening on port ${port}!`))
