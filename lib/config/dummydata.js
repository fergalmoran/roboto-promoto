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
user.save(function (err) {
    if (err) console.dir(err);
});

var date = new Date(2013, 0, 1);
for (var i = 0; i <= 100; i++) {
    new Promotion({
        title: 'Test Prom ' + i,
        user: user,
        created: date.getTime()
    }).save(function (err) {
            if (err) console.dir(err);
        });
    console.log("Bootstrapping promotion: " + (date + (i * 86400000)));
    date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))
}

console.log("Bootstrap complete");
