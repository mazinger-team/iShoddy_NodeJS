"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offerConceptSchema = Schema({

    concept: String,
    userId: String,
    offerId: String,
    prize: Number,
    quantity: Number,
    totalPrize: Number,
    coin: String,
    description: String

}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// Export schema
var OfferConcept = mongoose.model('OfferConcept', offerConceptSchema);
