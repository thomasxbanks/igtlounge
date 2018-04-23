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
  let pageSlug = 'index';
  site.template = pageSlug;
  site.page = {
    slug: pageSlug,
    template: site.template,
    masthead: 'website',
    colophon: 'website',
    body: { title: 'Home', classes: [site.template, pageSlug] },
    subnavigation: false,
    breadcrumbs: false,
  };
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for our Styleguide
router.get('/styleguide', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.originalUrl.split('/')[1];
  site.template = 'styleguide';
  site.page = {
    slug: pageSlug,
    template: site.template,
    masthead: 'website',
    colophon: 'website',
    body: { title: 'Home', classes: [site.template, pageSlug] },
    subnavigation: false,
    breadcrumbs: false,
  };
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for our Blog
router.get('/news-events', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.originalUrl.split('/')[1];
  site.template = 'blog-archive';
  site.page = {
    slug: pageSlug,
    template: site.template,
    masthead: 'website',
    colophon: 'website',
    body: { title: 'Home', classes: [site.template, pageSlug] },
    subnavigation: false,
    breadcrumbs: false,
  };
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for our Blog Articles
router.get('/news-events/:slug', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.params.slug;
  site.template = 'blog-single';
  site.page = {
    slug: pageSlug,
    template: site.template,
    masthead: 'website',
    colophon: 'website',
    body: { title: pageSlug, classes: [site.template, pageSlug] },
    subnavigation: false,
    breadcrumbs: true,
  };
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for our Admin panel
router.get('/admin', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.originalUrl.split('/')[1];
  site.template = 'admin';
  site.page = {
    slug: pageSlug,
    template: site.template,
    masthead: 'admin',
    colophon: 'admin',
    body: { title: site.pages[pageSlug].title, classes: [site.template, pageSlug] },
    subnavigation: site.pages[pageSlug].subnavigation,
    breadcrumbs: true,
  };
  res.render(`pages/admin/${site.template}`, res.app.locals);
});

// route for Manage Games panel
router.get('/manage-games', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.originalUrl.split('/')[1];
  site.template = 'admin';
  site.page = {
    slug: pageSlug,
    template: site.template,
    masthead: 'admin',
    colophon: 'admin',
    body: { title: site.pages[pageSlug].title, classes: [site.template, pageSlug] },
    subnavigation: site.pages[pageSlug].subnavigation,
    breadcrumbs: true,
  };
  res.render(`pages/admin/${site.template}`, res.app.locals);
});

// route for Adding a Game panel
router.get('/manage-games/:slug', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.params.slug;
  site.template = 'admin';
  site.page = {
    slug: pageSlug,
    template: site.template,
    masthead: 'admin',
    colophon: 'admin',
    body: { title: site.pages[pageSlug].title, classes: [site.template, pageSlug] },
    subnavigation: site.pages[pageSlug].subnavigation,
    breadcrumbs: true,
  };
  res.render(`pages/admin/${site.template}`, res.app.locals);
});

// Final Catch-all for errors
router.get('/*', function(req, res) {
  let site = res.app.locals.site;
  var pageSlug = site.template;
  site.template = 'error';
  site.page = {
    slug: pageSlug,
    template: site.template,
    masthead: 'website',
    colophon: 'admin',
    body: { title: 'Oops!', classes: [site.template, pageSlug] },
    subnavigation: false,
    breadcrumbs: false,
  };
  res.render(`pages/${site.template}`, res.app.locals);
});
