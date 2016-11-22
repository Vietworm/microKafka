/**
 * Created by hailp on 11/22/16.
 */

"use strict";

let kafka = require('kafka-node'),
    Producer = kafka.Producer,
    HighLevelProducer = kafka.HighLevelProducer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.Client('localhost:2181'),
    producer = new HighLevelProducer(client);

producer.on('ready', function () {

    let topic = 'techmaster',
        message = 'a message social',
        keyedMessage = new KeyedMessage('keyed', 'a keyed message'),
        p = 0;

    // Check if exists topics then send payload

    // let payloads = [{topic: topic, partition: p, messages: [message, keyedMessage], attributes: 0}];
    let payloads = [{topic: topic, partition: p, messages: message, attributes: 0}];

    producer.send(payloads, function(err, result){
        console.log(err || result);
        process.exit(0);
    });

});

producer.on('error', function (err) {
    if (err) {
        throw new err;
    }
});