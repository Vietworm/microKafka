/**
 * Created by hailp on 11/22/16.
 */

"use strict";

let zipkinTracer = require('finciero-zipkin-js');

let tracer = new zipkinTracer.TracerJS();

tracer.config({
    name: "techmaster-services",
    kind: 'techmaster-kind',
    logger: "The big bang theory"
});

tracer.start();

