'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('User'),
Promotion = mongoose.model('Promotion'),
Thing = mongoose.model('Thing');
var user;

console.log("Creating users");
// Clear old users, then add a default user
User.find({}).remove(function() {
    user = new User({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test' }, function() {
            console.log('finished populating users');
        }
    );
});

Promotion.find({}).remove(function(){
    console.log("Creating promotions");
    Promotion.create({
        title: 'Dev prom 1',
        user: user
    }, {
        title: 'Dev prom 2',
        user: user
    }, {
        title: 'Dev prom 3',
        user: user
    }, function(err){
        console.log('finished populating promotions');
    });
});

