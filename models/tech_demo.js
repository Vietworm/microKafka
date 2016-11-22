/**
 * Created by hailp on 11/22/16.
 */

"use strict";

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let TechDemo = new Schema({
    email: {type: String, required: true, minlength: 3, maxlength: 128, lowercase: true},
    password: {type: String, required: true},
    salt: {type: String, default: ''},
    full_name: {type: String, default: '', maxlength: 96, trim: true},
    is_lock: {type: Number, enum: [0, 1], default: 0},
}, {
    collection: 'TechDemo',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('TechDemo', TechDemo);