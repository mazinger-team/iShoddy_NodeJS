"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({

    name: String,
    lastName: String,
    email: String,
    password: String,
    telephone: Number,
    addresses : [{type: Schema.ObjectId, ref: "Address" }],
    professionals : [{type: Schema.ObjectId, ref: "Professional" }],
    demands: [{ type: Schema.ObjectId, ref: "Demand" }],
    favorites : [{type: Schema.ObjectId, ref: "Professional" }],
    creditCards: [{type: Schema.ObjectId, ref: "CreditCard" }],
    ratingAccumulate: Number,
    ratingVotes: Number,
    rating: Number,
    modificationDay:{type: Date, default: Date.now }

}, {
    versionKey: false   // No añade parámetro de version (__v)

});




// Export schema
var User = mongoose.model('User', userSchema);

