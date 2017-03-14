var mongoose = require('mongoose');
var PixelObj = mongoose.model('PixelObj');
var assert = require('assert');
var variables = require('../helpers/variables');

//GET - Return all pixel objects in the DB
exports.findAllPixelObj = function(req,res){
  PixelObj.find((err,pixelobjs) => {
    if(err){
      res.status(500).send("Errorr "+variables.OPERACION+"[1]: " + err.message);
    }
    console.log('GET [1]/PixelObj - All');
    if(pixelobjs){
      res.status(200).jsonp(pixelobjs);
    }else{
      res.status(200).jsonp("Errorr "+variables.NOEXISTE+"[2]");
    }

  })
}
//GET - Return a unique object by id
exports.findById = function(req,res){
  PixelObj.findById(req.params.id,(err,pixelobj)=>{
    if(err) return res.status(500).send("Error "+variables.OPERACION+"[1]: " + err.message);
    console.log('GET [1]/PixelObj - '+req.params.id);
    if(pixelobj){
      res.status(200).jsonp(pixelobj);
    }else{
      res.status(200).jsonp("Error "+variables.NOEXISTE+"[2]");
    }
  });
}

//POST - agregar un nuevo pixel al mapa
exports.addPixelObj = function(req,res){
  var pixel = new PixelObj({
    x : req.body.x,
    y : req.body.y,
    value : req.body.value,
    room : req.body.room,
    type : req.body.type,
  });
  var promise = pixel.save();
  promise.then((pixelobj) => {
    console.log('GET [2]/PixelObj');
    res.status(200).jsonp(pixel);
  }).catch((err) => {
    if(err) return res.status(500).send("Errorr "+variables.OPERACION+"[1]: " +err.message);
  });
}

//PUT - Update a object
exports.updatePixelObj = function(req,res){
  PixelObj.findById(req.params.id,(err,pixelobj)=>{
    if(err) return res.status(500).send("Errorr "+variables.OPERACION+"[1]: " + err.message);
    console.log('GET [1]/PixelObj - '+req.params.id);
    pixelobj.x = req.body.x;
    pixelobj.y = req.body.y;
    pixelobj.value = req.body.value;
    pixelobj.room = req.body.room;
    pixelobj.type = req.body.type;

    var promise = pixelobj.save();
    promise.then(() => {
      console.log('PUT [4]/PixelObj - '+req.params.id);
      res.status(200).jsonp(pixelobj);
    }).catch((err) => {
      if(err) return res.status(500).send("Errorr "+variables.OPERACION+"[2]: " +err.message);
    });
  });
}

//DELETE - borrar un pixel a travez de un id pasado por delete
exports.deletePixelObj = function(req,res){
  PixelObj.findById(req.params.id,(err,pixelobj)=>{
    if(err) return res.status(500).send("Errorr "+variables.OPERACION+"[1]: "+err.message);
    //una vez que se verifique que no existe error se pregunta si
    //la variable existe o no (existe si fue encontrada el la bd)
    console.log('GET [1]/PixelObj - '+req.params.id);
    if(pixelobj){
      pixelobj.remove((err)=>{
        if(err) return res.status(500).send("Errorr "+variables.OPERACION+"[2]: "+err.message);
          console.log('DELETE [3]/PixelObj - '+req.params.id);
        res.status(200).send(req.params.id + ': borrado');
      });
    }else{
      res.status(200).send("Error "+variables.NOEXISTE+": No existe pixel");
    }
  });
}
