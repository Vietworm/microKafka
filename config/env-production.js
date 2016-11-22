/**
 * Created by hailp on 11/22/16.
 */

"use strict";

module.exports = {
    db: {
        host: '127.0.0.1:27017',
        secondary: '',
        database: 'tech_service',
        dialect: 'mongodb',
        options: {
            logging: true,
            replset: {
                name: 'tech',
                status: false
            },
            auth: false
        },
        username: 'root',
        password: '123@123'
    }
};