"use strict";


var postRoute = function (newModel, req, res, next) {

    newModel.save(function (err, result) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, result: result});
    })

};




module.exports = postRoute;