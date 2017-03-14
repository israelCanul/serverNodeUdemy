var express = require('express');
var app = express();
var routes = require('./routes/index');
// manejador de routes del sitio
var router = express.Router();

router.get('/',routes.index);
router.get('/about',routes.about);



app.use(router);
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
