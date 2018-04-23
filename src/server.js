'use strict';
var express = require('express');
var path = require('path');
var helmet = require('helmet');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();
app.use(helmet());
var port = process.env.PORT || 8008;
var directory = {
  views: `${__dirname}/views/`,
};
app.use(express.static(path.join(__dirname, '')));

app.set('view engine', 'ejs');
app.set('views', directory.views);
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
    views: directory.views,
    title: 'IGT Casino Lounge',
    description: '',
    author: 'Cube 3',
    template: 'index',
    today: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
    colophon: d.getFullYear(),
    usertypes: {
      superAdmin: {
        navigation: [
          { link: 'manage-games', text: 'Manage games' },
          { link: 'users', text: 'Users' },
          { link: 'operators', text: 'Operators' },
        ],
      },
      accountManager: {
        navigation: [],
      },
      contentManager: {},
    },
    pages: {
      admin: { subnavigation: [] },
      'manage-games': {
        title: 'Manage games',
        subnavigation: [{ link: 'manage-games/add-game', text: 'Add a game' }],
      },
      'add-game': {
        title: 'Add a game',
        subnavigation: false,
      },
    },
  },
  user: {
    securityLevel: 3,
    usertype: 'superAdmin',
    operators: [{ link: 'william-hill', text: 'William Hill' }, { link: 'betfair', text: 'BetFair' }],
  },
};

var router = require('./routes/routes');
app.use(router);

app.listen(port, () => {
  console.log(`app started. Listening on port ${port}`);
});
