/**
 * Created by hailp on 11/22/16.
 */

"use strict";

let zookeeper = require('node-zookeeper-client');

let client = zookeeper.createClient('localhost:2181');
let path = process.argv[2];

client.once('connected', function(){
    console.log("Connected to the server.");

    client.create(path, function(error){
        if (error){
            console.log("Failed to create node: %s due to: %s.", path, error);
        } else {
            console.log("Node: %s is successfully created.", path);
        }

        client.close();
    })
});

client.connect();