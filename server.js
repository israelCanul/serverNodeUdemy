var express = require('express');
var app = express();
var routes = require('./routes/index');
var bodyParser  = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require('mongoose');
//importamos los controles para la BD
var models     = require('./modelsDB/pixel')(app, mongoose);
var pixelObjCtrl = require('./controllers/pixelObj');


// manejador de routes del sitio
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


//aqui se generan las rutas ya sean de tipo get, post o demas
router.route('/pixel')
  .get(pixelObjCtrl.findAllPixelObj)
  .post(pixelObjCtrl.addPixelObj);
router.route('/pixel/:id')
    .delete(pixelObjCtrl.deletePixelObj)
    .get(pixelObjCtrl.findById)
    .put(pixelObjCtrl.updatePixelObj);


// se declara que se van a usar las rutas antes dadas de alta
app.use(router);
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pixelobj',function(error, res){
  if(error){
    console.log('ERROR: connecting in db' + error);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
})
