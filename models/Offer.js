"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offerSchema = Schema({

    title: String,
    userIdClient: String,
    userIdProfess: String,
    professionalId: String,
    offerConcepts: [{ type: Schema.ObjectId, ref: "OfferConcept" }],
    demandId: String,
    totalPrize: Number,
    coin: String,
    date: Date,
    description: String,
    estimatedDaysDuration: Number,
    estimatedDayToInit: Date,
    Accept: Boolean,
    modificationDay:{type: Date, default: Date.now }

}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// Export schema
var Offer = mongoose.model('Offer', offerSchema);
