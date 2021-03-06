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

mongoose.model('Promotion', PromotionSchema);
