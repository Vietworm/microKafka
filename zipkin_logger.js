/**
 * Created by hailp on 11/22/16.
 */

"use strict";

let zipkin = require('zipkin'),
    KafkaLogger = require('zipkin-transport-kafka');

let kafkaRecoder = new zipkin.BatchRecorder({
    logger: new KafkaLogger.KafkaLogger({
        clientOpts: {
            connectionString: 'localhost:2181'
        }
    })
});

let ctxImpl = new zipkin.ExplicitContext();

let tracer = new zipkin.Tracer({
    recorder: kafkaRecoder,
    ctxImpl
});

tracer.setId(tracer.createRootId());

tracer.recordServiceName("Techmaster");
tracer.recordRpc("GET");
tracer.recordBinary("Local Component", "Techmaster");
tracer.recordBinary('span.kind', "Techmaster");
tracer.recordAnnotation(new zipkin.Annotation.ServerRecv());
tracer.recordAnnotation(new zipkin.Annotation.LocalAddr({port: "2181"}));


tracer.scoped(() => {
    tracer.recordBinary(`Techmaster.status`, 'ok');
    tracer.recordAnnotation(new zipkin.Annotation.ServerSend());
});

// tracer.setId("social");
// tracer.recordServiceName("Zipkin services");
// tracer.recordBinary('error', 'ok');



// tracer.recordMessage("social");
