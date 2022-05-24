const { meter } = require('./monitoring')

const messagesReceivedCounter = meter.createCounter('messages_received', {
  description: 'A number of messages received'
});

const labels = { "test":"hieunlp", pid: process.pid };

const countAllMessages = () => {
  messagesReceivedCounter.bind(labels).add(1);
};

exports.countAllMessages = countAllMessages;
