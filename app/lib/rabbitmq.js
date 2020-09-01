const amqplib = require('amqplib');

let channels = {};
let connection = false;
const rabbitmq = {
    async connect() {
        try {
            connection = await amqplib.connect(`amqp://guest:guest@172.17.0.4`);
            console.log(`rabbitMq connected at guest:guest@172.17.0.4`);
        } catch (e) {
            throw e;
        }
    },
    createChannel() {
        try {
            return connection.createChannel();
        } catch (e) {
            throw e;
        }
    },

    async assertQueue(queue, config = { durable: true }, concurrency = 1) {
        try {
            channels[queue] = await rabbitmq.createChannel(queue);
            channels[queue].prefetch(concurrency);
            await channels[queue].assertQueue(queue, config);

            channels[queue].on('close', () => {
                console.log('Channel closed');
                process.exit(1);
            });

            channels[queue].on('error', e => {
                console.log('Channel error', e);
                process.exit(1);
            });
        } catch (e) {
            throw e;
        }
    },

    sendMessage(queue, message) {
        try {
            return channels[queue].sendToQueue(queue, Buffer.from(message), { persistent: true });
        } catch (e) {
            throw e;
        }
    },

    ack(queue, message) {
        try {
            channels[queue].ack(message);
        } catch (e) {
            throw e;
        }
    },

    nack(queue, message) {
        try {
            channels[queue].nack(message);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = rabbitmq;