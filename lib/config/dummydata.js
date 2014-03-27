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

for (var i=0;i<=100;i++){
    var promotion = new Promotion({ title: 'Test Prom ' + i, user: user }).save(function(err){ if (err) console.dir(err);});
    console.log("Bootstrapping promotion: " + i);
}

console.log("Bootstrap complete");
