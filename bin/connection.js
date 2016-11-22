/**
 * Created by hailp on 11/22/16.
 */

"use strict";

let env = process.env.NODE_ENV || 'env-production',
    config = require(__base + '/config/' + env),
    mongoose = require('mongoose');

let mongoUri = `mongodb://${config.db.host}/${config.db.database}`;

let options = {
    db: {native_parser: true},
    server: {
        socketOptions: {keepAlive: 1},
        poolSize: 5
    },
    auth: {
        authdb: 'admin'
    },
    replset: {
        rs_name: config.db.options.replset.name,
        socketOptions: {keepAlive: 1}
    }
};

if (config.db.options.auth) {
    options.user = config.db.username;
    options.pass = config.db.password;
}


mongoose.connect(mongoUri, options);
mongoose.connection.on('error', function (err) {
    if (err.message.indexOf('EHOSTUNREACH') > -1) {
        console.log("There is no Internet connection.");
        process.exit(0);
    }
    if (err) throw err;
});

mongoose.set('debug', config.db.options.logging);

module.exports = db;