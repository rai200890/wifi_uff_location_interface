var express = require('express'),
  app = express(),
  path = require('path');

app.use('/', express.static(path.join(__dirname, '/dist')));
app.get('*', function(req, res) {
  res.set('Content-Type', 'text/html');
  res.sendFile(__dirname + '/app/index.html');
});

app.listen(process.env.PORT || 5000);

module.exports = app;
