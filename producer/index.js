const { tracer } = require ('./tracing')
const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const message = {
  name: 'hieu',
  last_name: 'nguyen',
  position: 'devops'
}

const run = async () => {
  await producer.connect()
  await producer.send({
    topic: 'topic',
    messages: [
      { value: JSON.stringify(message) }
    ]
  })
  await producer.disconnect()
}

run().catch(console.error)
