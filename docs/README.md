# Techmaster Payment Services


## Hướng dẫn cài đặt Apache Kafka 

+ Bước 1: Tải về file cài đặt tại địa chỉ: [kafka_2.11-0.10.0.0.tgz](http://www-us.apache.org/dist/kafka/0.10.0.0/kafka_2.11-0.10.0.0.tgz)

    > Xem thêm tại đây: [Apache kafka](https://www.apache.org/dyn/closer.cgi?path=/kafka/0.10.0.0/kafka_2.11-0.10.0.0.tgz)

+ Bước 2: Giải nén file cài đặt:

```bash
    tar -xzf kafka_2.11-0.10.0.0.tgz
```

+ Bước 3: Các bước để khởi tạo Broker, Producer publish topics và Consumer subscribe topics.

1. Chạy Zookeeper:
```bash
    vietworm$ bin/zookeeper-server-start.sh config/zookeeper.properties
```

2. Chạy Kafka server: 
```bash
    vietworm$ bin/kafka-server-start.sh config/server.properties
```

3. Tạo các topics cần sử dụng:

+ Ví dụ: Tạo topic với tên `techmaster`
```bash
    vietworm$ bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic techmaster
```

> Xem danh sách các topics đã được tạo
```bash
    vietworm$ bin/kafka-topics.sh --list --zookeeper localhost:2181
```

> Xem thông tin topics

+ Ví dụ: Xem thông tin topic `techmaster`
```bash
    vietworm$ bin/kafka-topics.sh --describe --zookeeper localhost:2181 --topic techmaster
```

4. Chạy Producer (Publish):

Ví dụ: Truyền tin cho consumer đang lắng nghe topic `techmaster`

```bash
    vietworm$ bin/kafka-console-producer.sh --broker-list localhost:9092 --topic techmaster
```
 
5. Chạy Consumer (Subscribe):

Ví dụ: Lắng nghe topic `techmaster`

```bash
    vietworm$ bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic techmaster
```

## Sử dụng zipkin để debug là tracking trong mô hình MicroService

Sử dụng `zipkin-transport-kafka` để kết nối với `kafka`. Mặc định `zipkin-transport-kafka` sẽ sử dụng topic có tên là: `zipkin` để gửi dữ liệu
lại cho `kafka` server.

> Code mẫu như sau:

```javascript
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
```

> Cài đặt `zipkin` bằng docker.

```bash
    $vietworm$ docker run -d -p 9411:9411 openzipkin/zipkin
```

+ Tham khảo thêm tại địa chỉ: [zipkin.io](http://zipkin.io)

Sau đó truy cập vào địa chỉ: [http://localhost:9411](http://localhost:9411)

> if your setup is correct, you'd be able to get trace id 1 (ex curl -s localhost:9411/api/v1/trace/1)

```bash
    curl -s localhost:9411/api/v1/trace/1
```

