"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = Schema({

    name: String,
    idCategory: { type: Schema.ObjectId, ref: "Category" },
    active: Boolean,
    modificationDay: {type: Date, default: Date.now },
    tags: [String]

}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// static methods
subcategorySchema.statics.list = function(filter, sort, limit, skip, fields) {
    return new Promise(function(resolve, reject) {
        var query = Subcategory.find(filter).
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
var Subcategory = mongoose.model('Subcategory', subcategorySchema);
