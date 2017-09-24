"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema({

    name: String,
    active: Boolean,
    modificationDay: {type: Date, default: Date.now },
    urlLogo: String,
    subcategories: [{ type: Schema.ObjectId, ref: "Subcategory" }],
    tags: [String]
}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// static methods
categorySchema.statics.list = function(filter, sort, limit, skip, fields) {
    return new Promise(function(resolve, reject) {
        var query = Category.find(filter).
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
var Category = mongoose.model('Category', categorySchema);

