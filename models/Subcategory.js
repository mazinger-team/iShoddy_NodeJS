"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subcategorySchema = Schema({

    name: String,
    category: { type: Schema.ObjectId, ref: "Category" },
    active: Boolean,
    modificationDay: {type: Date, default: Date.now },
    tags: [String]

}, {
    versionKey: false   // No añade parámetro de version (__v)

});




// Export schema
var Subcategory = mongoose.model('Subcategory', subcategorySchema);
