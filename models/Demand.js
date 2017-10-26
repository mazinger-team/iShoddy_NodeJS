"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demandSchema = Schema({

    title: String,
    date: Date,
    description: String,
    userId: String,
    addressId: String,
    professionalSelecId: String,
    professionals: [{ type: Schema.ObjectId, ref: "Professional" }],
    offers: [{ type: Schema.ObjectId, ref: "Offer" }],
    category: { type: Schema.ObjectId, ref: "Category" },
    subcategory: { type: Schema.ObjectId, ref: "Subcategory" },
    gps_lat: Number,
    gps_lon: Number,
    imagesDemandUrls: [String],
    imagesProfessUrls: [String],
    serviceStars: Number,
    serviceOpinion: String,
    userStars: Number,
    userOpinion: String,
    active: Boolean,
    modificationDay:{type: Date, default: Date.now }

}, {
    versionKey: false   // No añade parámetro de version (__v)

});


// Export schema
var Demand = mongoose.model('Demand', demandSchema);
