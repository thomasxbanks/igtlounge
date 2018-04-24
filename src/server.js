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
          { link: 'admin/games', text: 'Manage games' },
          { link: 'admin/users', text: 'Manage Users' },
          { link: 'admin/operators', text: 'Manage Operators' },
        ],
      },
      accountManager: {},
      contentManager: {},
    },
    pages: {
      admin: {
        subnavigation: false,
        games: {
          securityLevel: 3,
          title: 'Games',
          subnavigation: [{ link: 'admin/games/add-game', text: 'Add a game' }],
          'add-game': {
            securityLevel: 3,
            title: 'Add a game',
            subnavigation: false,
          },
        },
        users: {
          securityLevel: 3,
          title: 'Users',
          subnavigation: [{ link: 'admin/users/add-user', text: 'Add a user' }],
          'add-user': {
            securityLevel: 3,
            title: 'Add a user',
            subnavigation: false,
          },
        },
        operators: {
          securityLevel: 2,
          title: 'Operators',
          subnavigation: [{ link: 'admin/operators/add-operator', text: 'Add an operator' }],
          'add-operator': {
            securityLevel: 2,
            title: 'Add an operator',
            subnavigation: false,
          },
        },
      },
    },
  },
  user: {
    isLoggedIn: true,
    securityLevel: 3,
    usertype: 'superAdmin',
    name: 'Benedict Cumberbatch',
    operators: [
      { link: 'admin/operators/william-hill', text: 'William Hill' },
      { link: 'admin/operators/betfair', text: 'BetFair' },
    ],
  },
};

var router = require('./routes/routes');
app.use(router);

app.listen(port, () => {
  console.log(`app started. Listening on port ${port}`);
});
