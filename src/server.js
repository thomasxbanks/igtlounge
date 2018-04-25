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
          { slug: 'games', link: 'admin/games', text: 'Manage games' },
          { slug: 'users', link: 'admin/users', text: 'Manage Users' },
          { slug: 'operators', link: 'admin/operators', text: 'Manage Operators' },
        ],
      },
      accountManager: {
        navigation: [{ slug: 'operators', link: 'admin/operators', text: 'Manage Operators' }],
      },
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
          subnavigation: false,
        },
      },
    },
    messages: {
      forms: {
        failure: {
          generic: 'Generic error message',
          required: 'Please do not leave this blank. ',
          invalid: {
            letters: 'Please use only letters. ',
            numbers: 'Please use only numbers. ',
            short: 'Please limit description to 250 characters. ',
            id: 'Please enter a valid ID. ',
          },
        },
      },
    },
  },
  usergroups: [{ slug: 'igt', name: 'IGT' }, { slug: 'operator', name: 'Operator' }],
  operators: [
    {
      slug: 'william-hill',
      name: 'William Hill',
      accountManager: { UID: '001' },
    },
    {
      slug: 'betfair',
      name: 'BetFair',
      accountManager: { UID: '003' },
    },
    {
      slug: 'skybet',
      name: 'SkyBet',
      accountManager: { UID: '001' },
    },
  ],
  users: [
    {
      UID: '001',
      isLoggedIn: false,
      securityLevel: 2,
      usertype: { slug: 'accountManager', name: 'Account Manager' },
      usergroup: { slug: 'igt', name: 'IGT' },
      name: { firstName: 'Katherine', surname: 'Richardson-Beckinsale' },
      operators: [],
    },
    {
      UID: '002',
      isLoggedIn: false,
      securityLevel: 3,
      usertype: { slug: 'superAdmin', name: 'Super Admin' },
      usergroup: { slug: 'igt', name: 'IGT' },
      name: { firstName: 'Benedict', surname: 'Cumberbatch' },
      operators: false,
    },
  ],
  games: [
    {
      name: 'Monkey Tennis',
    },
    {
      name: 'Elephant Kingdom',
    },
    {
      name: 'Witch Wood',
    },
  ],
  user: {
    UID: '002',
  },
};

var router = require('./routes/routes');
app.use(router);

app.listen(port, () => {
  console.log(`app started. Listening on port ${port}`);
});
