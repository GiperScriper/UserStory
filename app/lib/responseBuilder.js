/*
 this bind's to res object from routes
*/

exports.buildGetResponse = function (data) {
    var result = {
        data: data,
        status: 'success'
    }

    this.status(200).json(result);
};

exports.buildCreateResponse = function (data) {
    var result = {
        data: data,
        status: 'success'
    }

    this.status(201).json(result);
};


exports.buildErrorResponse = function (err) {
    var error = {
        name: err.name,
        message: err.message,
        errors: err.errors
    }

    this.status(400).json(error);
};