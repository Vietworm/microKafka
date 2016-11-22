/**
 * Created by hailp on 11/22/16.
 */

"use strict";

let kafka = require('kafka-node'),
    client = new kafka.Client(),
    offset = new kafka.Offset(client);

offset.fetch([
    {topic: 'techmaster', partition: 0, time: Date.now(), maxNum: 1}
], function(err, data){
    console.log(err);
    console.log(data);
});