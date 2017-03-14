exports.index = function(req,res){
  res.send(req.query.id);
}

exports.about = function(req,res){
  res.send("este es el abpout");
}
