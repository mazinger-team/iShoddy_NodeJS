"use strict";


var deleteRoute = function (model, id, req, res, next) {

    model.remove({_id: id}, function(err, result) {
        if (err) {
            return next(err);
        }
        res.json({succes: true, result: result});
    });

};


module.exports = deleteRoute;
