"use strict";


var putRoute = function (model, id, req, res, next) {

    model.update({_id: id}, req.body, function(err, result) {
        if (err) {
            next(err);
            return;
        }
        res.json({success: true, result: result});
    });

};




module.exports = putRoute;