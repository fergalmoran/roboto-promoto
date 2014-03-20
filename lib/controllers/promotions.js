'use strict';

var mongoose = require('mongoose'),
Promotion = mongoose.model('Promotion'),
passport = require('passport');


exports.list = function(req, res){
    return Promotion.find(function(err, promotions){
        if (!err){
            return res.json(promotions);
        }else{
            return res.send(err);
        }
    });
};
exports.create = function (req, res, next) {
    var newPromotion = new Promotion(req.body);
    newPromotion.provider = 'local';
    newPromotion.save(function(err) {
        if (err) return res.json(400, err);

        req.logIn(newPromotion, function(err) {
            if (err) return next(err);

            return res.json(req.promotion.promotionInfo);
        });
    });
};

exports.show = function (req, res, next) {
    var promotionId = req.params.id;

    Promotion.findById(promotionId, function (err, promotion) {
        if (err) return next(err);
        if (!promotion) return res.send(404);

        res.send({ profile: promotion.profile });
    });
};

exports.changePassword = function(req, res, next) {
    var promotionId = req.promotion._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    Promotion.findById(promotionId, function (err, promotion) {
        if(promotion.authenticate(oldPass)) {
            promotion.password = newPass;
            promotion.save(function(err) {
                if (err) return res.send(400);

                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};
