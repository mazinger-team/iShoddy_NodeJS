"use strict";

// We import the mongoose library
let mongoose = require('mongoose');
// It allows us to create an outline of an object to save inside the collection
let Schema = mongoose.Schema;

// We create the schema of the object
let ProfessionalSchema = Schema({
    user_id: String,
    user_name: String,
    demands: [String],
    category: String,       // Si usamos Id tipo Number?
    subcategory: String,    // Si usamos Id tipo Number?
    corp_name: String,
    logo_url: String,
    images_url: [String],
    description: String,
    fiscal_id: String,
    street: String,
    postal_code: String,
    area: String,
    city: String,
    province: String,
    gps_lat: Number,
    gps_lon: Number,
    web_url: String,
    email: String,
    telephone: String,
    opening_hours: String,
    register_date: Date,
    rate_visit: Number,
    rate_hour: Number,
    rate_notes: String,
    rating_accumulated: Number,
    rating_votes: Number,
    rating: Number,
    reviews_number: Number,
    photo_number: Number


    /*
    public var id : Int?
    public var user_id : Int?
    public var user_name : String?
    public var demands_id : Array<Int>?
    public var category_id : Int?
    public var subcategory_id : Int?
    public var corp_name : String?
    public var logo_url : String?
    public var images_url : Array<String>?
    public var description : String?
    public var fiscal_id : String?
    public var street : String?
    public var postal_code : String?
    public var area : String?
    public var city : String?
    public var province : String?
    public var gps_lat : Double?
    public var gps_lon : Double?
    public var web_url : String?
    public var email : String?
    public var telephone : String?
    public var opening_hours : String?
    public var register_date : Int?
    public var rate_visit : Int?
    public var rate_hour : Int?
    public var rate_notes : String?
    public var rating_accumulated : Int?
    public var rating_votes : Int?
    public var rating : Double?
    public var reviews_number : Int?
    public var photo_number : Int?
    public var distance : Double?
     */

}, {
    versionKey: false // No añade parámetro de version (__v)

});

// Export schema
module.exports = mongoose.model('Professional', ProfessionalSchema);
