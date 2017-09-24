"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offerSchema = Schema({

    offerLines: { type: Schema.ObjectId, ref: "OfferConcept" },
    demands: [{ type: Schema.ObjectId, ref: "Demand" }],
    professional: { type: Schema.ObjectId, ref: "Professional" },
    user: { type: Schema.ObjectId, ref: "User" },
    totalPrize: Number,
    coin: String,
    date: Date,                 // hour included
    description: String,
    estimatedDuration: Number,    // days
    estimatedDayToInit: Date,
    Accept: Boolean,
    created:{type: Date, default: Date.now }

}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// Export schema
var Offer = mongoose.model('Offer', offerSchema);
