var express = require('express');
var app = express();
app.use(express.static('public'));

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

app.get('/', function(req, res) {
  res.sendFile('/Users/sez/Code/parse/flibbertigibbet/index.html');
});