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
  let site = res.app.locals.site;
  site.template = 'index';
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for our Styleguide
router.get('/styleguide', function(req, res) {
  let site = res.app.locals.site;
  site.template = 'styleguide';
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for our Admin panel
router.get('/admin', function(req, res) {
  let site = res.app.locals.site;
  site.template = 'admin';
  site.body = {
    class: 'admin',
  };
  res.render(`pages/${site.template}`, res.app.locals);
});

// Final Catch-all for errors
router.get('/*', function(req, res) {
  let site = res.app.locals.site;
  site.template = 'error';
  res.render(`pages/${site.template}`, res.app.locals);
});
