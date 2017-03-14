var mongoose = require('mongoose'),
 Schema   = mongoose.Schema;

 var pixelObj = new Schema({
   x : {type : Number},
   y : {type : Number},
   value : {type : Number},
   room : {type : Number},
   type : {type : Number},
 });

module.exports = mongoose.model('PixelObj',pixelObj)
