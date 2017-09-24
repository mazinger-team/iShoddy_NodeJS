"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var creditCardSchema = Schema({

    user: { type: Schema.ObjectId, ref: "User" },
    cardNumber: Number,
    expiry_date: Date,
    cvv: Number,
    created:{type: Date, default: Date.now }

}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// Export schema
var CreditCard = mongoose.model('CreditCard', creditCardSchema);
