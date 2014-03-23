'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    app = require('../../../server'),
    agent = require('superagent'),
    request = require('supertest'),
    User = mongoose.model('User'),
    Promotion = mongoose.model('Promotion');

//create a passport user for authenticated requests
var user, provider, auth;

describe('Promotions Api', function(){
    before(function(done){
        User.remove().exec();
        Promotion.remove().exec();

        user = new User({
            provider: 'local',
            name: 'Fake User',
            email: 'test@test.com',
            password: 'password'
        });

        user.save(function(err){
            should.not.exist(err);
            auth = agent.agent();
            auth.post('/signin')
                .send({ user: 'test@test.com', password: 'password' })
                .end(function (err, res) {
                    done();
                });
        });
    });
    describe('GET /api/promotions', function () {
        it('should respond with JSON array', function (done) {
            request(app)
                .get('/api/promotions')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    done();
                });
        });
    });
    describe('POST /api/promotions', function () {
        it('should respond with the item POSTed', function (done) {
            request(app)
                .post('/api/promotions')
                .send({
                    title: 'API - Test 2',
                    user: auth
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    done();
                });
        });
    });
});
