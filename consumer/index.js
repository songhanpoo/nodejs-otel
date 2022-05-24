const { tracer } = require('./tracing')
const logger = require('./logging')
const { Kafka, logLevel } = require('kafkajs')
const { countAllMessages } = require('./metrics')
// const { mysql } = require('./mysql');

const kafka = new Kafka({
  clientId: 'consumer',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })
const consumerB = kafka.consumer({ groupId: 'test-group2' })
const consumerC = kafka.consumer({ groupId: 'test-group3' })
const producer = kafka.producer();

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger.info(`${message} -- Example log line with trace correlation info`)
      await producer.connect()
      await producer.send({
        topic: 'topic_new',
        messages: [
          { value: JSON.stringify(message) }
        ]
      })
      countAllMessages();
      await producer.disconnect()
      // insertEmployee(JSON.parse(message.value.toString()).name,
      //   JSON.parse(message.value.toString()).last_name,
      //   JSON.parse(message.value.toString()).position);
    },
  })
  await consumerB.connect()
  await consumerB.subscribe({ topic: 'topic_new', fromBeginning: true })
  await consumerB.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger.info(`${message} -- Example log line with trace correlation info`)
      // insertEmployee(JSON.parse(message.value.toString()).name,
      //   JSON.parse(message.value.toString()).last_name,
      //   JSON.parse(message.value.toString()).position);
      // countAllMessages();
    },
  })

  await consumerC.connect()
  await consumerC.subscribe({ topic: 'topic_new', fromBeginning: true })
  await consumerC.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger.info(`${message} -- Example log line with trace correlation info`)
      // insertEmployee(JSON.parse(message.value.toString()).name,
      //   JSON.parse(message.value.toString()).last_name,
      //   JSON.parse(message.value.toString()).position);
      // countAllMessages();
    },
  })
}

run().catch(console.error)
