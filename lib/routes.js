'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    promotions = require('./controllers/promotions'),
    session = require('./controllers/session'),
    mongoose = require('mongoose'),
    middleware = require('./middleware'),
    mers = require('mers');

module.exports = function (app) {


/*
    // Server API Routes
    app.get('/api/promotions', promotions.list);
    app.post('/api/promotions', promotions.create);
    app.post('/api/promotions/:id', promotions.show);


    app.post('/api/session', session.login);
    app.del('/api/session', session.logout);

    // All undefined api routes should return a 404
    app.get('/api/*', function (req, res) {
        res.send(404);
    });
*/

    app.post('/api/session', session.login);
    app.del('/api/session', session.logout);

    app.post('/api/users', users.create);
    app.put('/api/users', users.changePassword);
    app.get('/api/users/me', users.me);
    app.get('/api/users/:id', users.show);

    app.use('/api', mers({mongoose: mongoose}).rest());

    // All other routes to use Angular routing in app/scripts/app.js
    app.get('/partials/*', index.partials);
    app.get('/*', middleware.setUserCookie, index.index);
};
