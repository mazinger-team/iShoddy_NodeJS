'use strict';

module.exports = {
    database: 'mongodb://localhost:27017/ishoddy',
    jwt: {
        secret : 'nodemon1234@',
        expires: '2 days'
    },
    tags: ['work', 'lifestyle', 'motor', 'mobile'],
    languages: ['en', 'es'],
    num_rows: 10,
    DEBUG_TRACE : true
};