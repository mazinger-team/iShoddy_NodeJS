"use strict";

var mongoose = require('mongoose');

var professionalSchema = mongoose.Schema({

    user_id: String,
    user_name: String,
    demands: [String],
    category: String,       // Si usamos Id tipo Number?
    subcategory: String,    // Si usamos Id tipo Number?
    corp_name: String,
    logo_url: String,
    images_url: String,
    description: String,
    fiscal_id: String,
    street: String,
    postal_code: Number,
    area: String,
    city: String,
    province: String,
    gps: Object,
    web_url: String,
    email: String,
    telephone: Number,
    opening_hours: String,
    register_date: Date,
    rate_visit: Number,
    rate_hour: Number,
    rate_notes: String,
    rating_accumulated: Number,
    rating_votes: Number,
    rating: Number

}, {
    versionKey: false // No añade parámetro de version (__v)

});


// static methods
professionalSchema.statics.list = function(filter, sort, limit, skip, fields) {
    return new Promise(function(resolve, reject) {
        var query = Professional.find(filter).
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
var Professional = mongoose.model('Professional', professionalSchema);
