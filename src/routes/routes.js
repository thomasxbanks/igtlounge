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

const loadPageLogin = (site, res) => {
  site.page = {
    slug: 'login',
    template: site.template,
    masthead: 'admin',
    colophon: 'admin',
    body: { title: `Please log in to continue`, classes: [site.template, 'login'] },
    subnavigation: false,
    breadcrumbs: false,
  };
  res.render(`pages/login`, res.app.locals);
};

// START Public-facing content routes
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
// @TODO: We can ditch this in production
// Work out how!
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

// route for our Games
router.get('/games', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.originalUrl.split('/')[1];
  site.template = 'games-archive';
  site.page = {
    slug: pageSlug,
    template: site.template,
    masthead: 'website',
    colophon: 'website',
    body: { title: 'Games', classes: [site.template, pageSlug] },
    subnavigation: false,
    breadcrumbs: false,
  };
  res.render(`pages/${site.template}`, res.app.locals);
});

// route for our Game details
router.get('/games/:slug', function(req, res) {
  let site = res.app.locals.site;
  let pageSlug = req.params.slug;
  site.template = 'game-detail';
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
// END Public-facing content routes

// START Restricted content routes
// route for our Admin panel
router.get('/admin', function(req, res) {
  let local = res.app.locals;
  let site = local.site;
  let user = local.user;
  if (user.isLoggedIn) {
    site.template = 'admin';
    site.page = {
      slug: 'admin',
      template: site.template,
      masthead: 'admin',
      colophon: 'admin',
      body: { title: `Welcome back, ${user.name}!`, classes: [site.template, 'dashboard', user.usertype] },
      subnavigation: false,
      breadcrumbs: false,
    };
    res.render(`pages/admin/${site.template}`, local);
  } else {
    loadPageLogin(site, res);
  }
});

// route for main panel
router.get('/admin/:section', function(req, res) {
  let local = res.app.locals;
  let site = local.site;
  let user = local.user;
  let pageSection = req.params.section;
  if (user.isLoggedIn && user.securityLevel >= site.pages['admin'][pageSection].securityLevel) {
    site.template = 'admin';
    site.page = {
      slug: pageSection,
      template: site.template,
      masthead: 'admin',
      colophon: 'admin',
      body: { title: site.pages['admin'][pageSection].title, classes: [site.template, pageSection] },
      subnavigation: site.pages['admin'][pageSection].subnavigation,
      breadcrumbs: [
        { link: '/admin', text: 'Home' },
        { link: pageSection, text: site.pages['admin'][pageSection].title },
      ],
    };
    res.render(`pages/admin/${site.template}`, local);
  } else {
    loadPageLogin(site, res);
  }
});

// route for sub-panel
router.get('/admin/:section/:slug', function(req, res) {
  let local = res.app.locals;
  let site = local.site;
  let user = local.user;
  let pageSection = req.params.section;
  let pageSlug = req.params.slug;
  if (user.isLoggedIn && user.securityLevel >= site.pages['admin'][pageSection][pageSlug].securityLevel) {
    site.template = 'admin';
    site.page = {
      slug: pageSlug,
      template: site.template,
      masthead: 'admin',
      colophon: 'admin',
      body: {
        title: site.pages['admin'][pageSection][pageSlug].title,
        classes: [site.template, pageSection, pageSlug],
      },
      subnavigation: site.pages['admin'][pageSection][pageSlug].subnavigation,
      breadcrumbs: [
        { link: '/admin', text: 'Home' },
        { link: pageSection, text: site.pages['admin'][pageSection].title },
        { link: pageSlug, text: site.pages['admin'][pageSection][pageSlug].title },
      ],
    };
    console.log(site.page);
    res.render(`pages/admin/${site.template}`, local);
  } else {
    loadPageLogin(site, res);
  }
});
// END Restricted content routes

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
