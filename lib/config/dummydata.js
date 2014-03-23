'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Promotion = mongoose.model('Promotion');

console.log("Clearing old data");

User.remove().exec();
Promotion.remove().exec();

var user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@test.com',
    password: 'password'
});
user.save(function(err){ if (err) console.dir(err);});
var promotion = new Promotion({ title: 'Test Prom 1', user: user }).save(function(err){ if (err) console.dir(err);});
promotion = new Promotion({ title: 'Test Prom 2', user: user});
promotion.save(function(err){ if (err) console.dir(err);});
promotion = new Promotion({ title: 'Test Prom 3', user: user});
promotion.save(function(err){ if (err) console.dir(err);});
promotion = new Promotion({ title: 'Test Prom 4', user: user});
promotion.save(function(err){ if (err) console.dir(err);});


console.log("Bootstrap complete");