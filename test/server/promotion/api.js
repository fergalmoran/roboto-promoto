'use strict';

var should = require('should'),
app = require('../../../server'),
request = require('supertest');

describe('GET /api/promotions', function() {
    it('should respond with JSON array', function(done) {
        request(app)
            .get('/api/promotions')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});
describe('POST /api/promotions', function(){
    it('should respond with the item POSTed', function(done){
        request(app)
            .post('/api/promotions')
            .send({
                title: 'API - Test 2',
                user: {
                    name: 'Fergal Moran'
                }
            });
    });
});
