'use strict';

// require express
var express = require('express');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

// Bin off the favicon
router.get('/favicon.ico', function(req, res) {
  res.sendStatus(204);
});

// route for our homepage
router.get('/', function(req, res) {
  var body = JSON.parse(JSON.stringify(req.body));
  let site = res.app.locals.site;
  res.render(`pages/${site.template}`, body);
});

// route for our Styleguide
router.get('/styleguide', function(req, res) {
  var body = JSON.parse(JSON.stringify(req.body));
  let site = res.app.locals.site;
  site.template = 'styleguide';
  res.render(`pages/${site.template}`, body);
});

// Final Catch-all for errors
router.get('/*', function(req, res) {
  var body = JSON.parse(JSON.stringify(req.body));
  console.log(body); // Log the response

  res.render('pages/error', body);
});
