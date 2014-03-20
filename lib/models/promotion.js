'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/** Promotion Schema */
var PromotionSchema = new Schema({
    created: { type: Date, default: Date.now },
    title: { type: String, default: '', trim: true, required: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true }
});

/* Indexes */
PromotionSchema.index({title: 1, user: 1}, {unique: true});
var _model = mongoose.model('Promotion', PromotionSchema);

/* Operations */
PromotionSchema.statics.findByTitle = function(title, cb){
    console.log("findByTitle: " + title);
    _model.findOne({title: title}, cb);
};

