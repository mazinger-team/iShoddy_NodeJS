"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var creditCardSchema = Schema({

    userId: String,
    titular: String,
    cardNumber: Number,
    expiry_date: String,
    cvv: Number,
    modificationDay: { type: Date, default: Date.now }

}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// Export schema
var CreditCard = mongoose.model('CreditCard', creditCardSchema);
