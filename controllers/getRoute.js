"use strict";

var getList = function (model, req, res, next, sort) {

    var sort = req.query.sort || sort || null;
    let limit = req.query.limit || null;
    let skip = parseInt(req.query.skip) || 0;
    let fields = req.query.fields || null;

    let id = req.query.id;
    let name = req.query.name;
    let lastName = req.query.lastName;
    let corp_name = req.query.corp_name;
    let active = req.query.active;
    let rating = req.query.rating;
    let category = req.query.category;
    let subcategory = req.query.subcategory;
    let coord = req.query.coord;
    let description = req.query.description;

    let filter = { };

    if (typeof id !== 'undefined') {
        filter._id = id;
    }

    if (typeof name !== 'undefined') {
        filter.name = name;
    }

    if (typeof lastName !== 'undefined') {
        filter.lastName = lastName;
    }

    if (typeof corp_name !== 'undefined') {
        filter.corp_name = corp_name;
    }

    if (typeof active !== 'undefined') {
        filter.active = active;
    }

    if (typeof rating !== 'undefined') {
        filter.rating = rating;
    }

    if (typeof category !== 'undefined') {
        filter.category = category;
    }

    if (typeof subcategory !== 'undefined') {
        filter.subcategory = subcategory;
    }

    if (typeof coord !== 'undefined') {
        filter.coord = coord;
    }

    if (typeof description !== 'undefined') {
        filter.description = description;
    }



    return model.find(filter).
    sort(sort).
    limit(limit).
    skip(skip).
    select(fields);


};



module.exports = getList;
