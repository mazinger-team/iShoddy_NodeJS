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
    favorites : [{type: Schema.ObjectId, ref: "Professional" }],
    creditCards: [{type: Schema.ObjectId, ref: "CreditCard" }],
    ratingAccumulate: Number,
    retingVotes: Number,
    rating: Number,
    created:{type: Date, default: Date.now }

}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// static methods
userSchema.statics.list = function(filter, sort, limit, skip, fields) {
    return new Promise(function(resolve, reject) {
        var query = User.find(filter).
        sort(sort).
        limit(limit).
        skip(skip).
        select(fields).
        exec(function(err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};


// Export schema
var User = mongoose.model('User', userSchema);

