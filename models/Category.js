"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema({

    name: String,
    active: Boolean,
    urlLogo: String,
    subcategories: [{ type: Schema.ObjectId, ref: "Subcategory" }],
    modificationDay: {type: Date, default: Date.now },
    tags: [String]
}, {
    versionKey: false   // No añade parámetro de version (__v)

});




// Export schema
var Category = mongoose.model('Category', categorySchema);

