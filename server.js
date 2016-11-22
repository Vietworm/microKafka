/**
 * Created by hailp on 11/22/16.
 */

"use strict";

global.__base = __dirname;

let app = require('./bin/tech');
app.start(process.env.PORT || 3000, {
    debug: true
});

module.exports = app;