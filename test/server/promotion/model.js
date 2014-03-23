'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    Promotion = mongoose.model('Promotion'),
    User = mongoose.model('User');

var promotion, promotion2;
var user;

describe('Promotion Model', function () {
    before(function (done) {
        user = new User({
            provider: 'local',
            name: 'Fake User',
            email: 'test@test.com',
            password: 'password'
        });
        promotion = new Promotion({
            title: 'Test Prom 1',
            user: user
        });
        promotion2 = new Promotion({
            title: 'Test Prom 1',
            user: user
        });
        User.remove().exec();
        Promotion.remove().exec();
        done();
    });

    after(function (done) {
        //going to leave the data intact post test
        //as it is removed in before()
        Promotion.remove().exec();
        User.remove().exec();
        done();
    });

    it('should begin with no promotions', function (done) {
        Promotion.find({}, function (err, promotions) {
            promotions.should.have.length(0);
            done();
        });
    });
    describe('Save methods', function () {
        it('should be able to save', function (done) {
            promotion.save(function (err) {
                should.not.exist(err);
                done();
            });
        });
        it('should fail when saving a duplicate promotion', function (done) {
            promotion.save(function (err) {
                should.not.exist(err);
                promotion2.save(function (err) {
                    should.exist(err);
                    done();
                });
            });
        });
        it('should fail when saving without a user', function (done) {
            promotion.user = '';
            promotion.save(function (err) {
                should.exist(err);
                done();
            });
        });
        it('should fail when saving without a title', function (done) {
            promotion.title = '';
            promotion.save(function (err) {
                should.exist(err);
                done();
            });
        });

    });
    describe('Search methods', function () {
        it('should find promotion by title', function (done) {
            Promotion.findOne({title: 'Test Prom 1', user: user}, function (err, result) {
                should.exist(result);
                should.not.exist(err);
                result.title.should.equal('Test Prom 1');
                done();
            });
        });
    });
});
