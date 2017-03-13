var express = require('express');
var app = express();

app.get('/',function(req, res){
  console.log(req.query.id);
  res.send('hello express');
});
app.get('/about',function(req, res){
  console.log(req.query.id);
  res.send('hello express');
});

app.listen(3000,function(){
  console.log('nuevo usuario conectado');
});
