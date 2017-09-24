"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demandSchema = Schema({

    title: String,
    date: Date,
    description: String,
    user: { type: Schema.ObjectId, ref: "User" },
    address: { type: Schema.ObjectId, ref: "Address" },
    gps: Object,
    professionals: [{ type: Schema.ObjectId, ref: "Professional" }],
    professionalSelected: { type: Schema.ObjectId, ref: "Professional" },
    category: { type: Schema.ObjectId, ref: "Category" },
    // subcategory: String,
    imagesDemandUrls: [String],
    imagesProfessUrls: [String],
    serviceStars: Number,
    serviceOpinion: String,
    userStars: Number,
    userOpinion: String,
    offers: [{ type: Schema.ObjectId, ref: "Offers" }],
    created:{type: Date, default: Date.now }

}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// Export schema
var Demand = mongoose.model('Demand', demandSchema);
