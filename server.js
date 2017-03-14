var express = require('express');
var app = express();
var routes = require('./routes/index');
var bodyParser  = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require('mongoose');
// manejador de routes del sitio
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


//aqui se generan las rutas ya sean de tipo get, post o demas
router.get('/',routes.index);
router.get('/about',routes.about);
// se declara que se van a usar las rutas antes dadas de alta
app.use(router);

mongoose.connect('mongodb://localhost/pixelObj',function(error, res){
  if(error){
    console.log('ERROR: connecting in db' + error);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
})
