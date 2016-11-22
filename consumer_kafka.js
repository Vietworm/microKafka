/**
 * Created by hailp on 11/22/16.
 */

"use strict";


let kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client('localhost:2181');

let topics = [
    {topic: 'techmaster', partition: 0}
];

let options = {autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024};

let consumer = new Consumer(client, topics, options);

consumer.on('message', function(message){
    console.log(message);
});
