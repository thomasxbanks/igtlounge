'use strict';
var express = require('express');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8008;

app.use(express.static(path.join(__dirname, '')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');
app.use(expressLayouts);

// use body parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var d = new Date();

app.locals = {
  site: {
    title: 'IGT Casino Lounge',
    description: '',
    author: 'Cube 3',
    template: 'index',
    colophon: d.getFullYear(),
  },
};

var router = require('./routes/routes');
app.use(router);

app.listen(port, () => {
  console.log(`app started. Listening on port ${port}`);
});
