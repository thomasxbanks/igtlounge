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
  let pageSlug = req.originalUrl.split('/')[1];
  site.page = pageSlug;
  site.template = 'index';
  site.body = { classes: ['website'] };
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for our Styleguide
router.get('/styleguide', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.originalUrl.split('/')[1];
  site.page = pageSlug;
  site.template = 'styleguide';
  site.body = { classes: ['website'] };
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for our Admin panel
router.get('/admin', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.originalUrl.split('/')[1];
  site.page = pageSlug;
  site.template = 'admin';
  site.body = { classes: ['admin'], title: 'Dashboard' };
  site.subnavigation = [];
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for Manage Games panel
router.get('/manage-games', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.originalUrl.split('/')[1];
  site.page = pageSlug;
  site.template = 'admin';
  site.body = {
    classes: ['admin', 'test'],
    title: 'Manage games',
  };
  site.subnavigation = site.pages[pageSlug].subnavigation;
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for Adding a Game panel
router.get('/add-game', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.originalUrl.split('/')[1];
  site.page = pageSlug;
  site.template = 'admin';
  site.body = {
    classes: ['admin'],
    title: 'Add a game',
  };
  site.subnavigation = site.pages[pageSlug].subnavigation;
  res.render(`pages/${site.template}`, res.app.locals);
});
// Final Catch-all for errors
router.get('/*', function(req, res) {
  let site = res.app.locals.site;
  site.template = 'error';
  res.render(`pages/${site.template}`, res.app.locals);
});
