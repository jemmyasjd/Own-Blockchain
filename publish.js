const Redis = require('ioredis');
const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
};

class PubSub {
    constructor({ blockchain }) {
        this.blockchain = blockchain;
        this.publisher = new Redis();
        this.subscriber = new Redis();

        this.subscriber.subscribe(CHANNELS.TEST, CHANNELS.BLOCKCHAIN, (err, count) => {
            if (err) {
                console.error('Failed to subscribe: %s', err.message);
            } else {
                console.log(`Subscribed successfully! This client is currently subscribed to ${count} channels.`);
            }
        });

        this.subscriber.on('message', (channel, message) => this.handleMessage(channel, message));
    }

    handleMessage(channel, message) {
        console.log(`Message received. Channel: ${channel} Message: ${message}`);
        const parsedMessage = JSON.parse(message);
        if (channel === CHANNELS.BLOCKCHAIN) {
            this.blockchain.replaceChain(parsedMessage);
        }
    }

    publish({ channel, message }) {
        this.publisher.publish(channel, message);
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain),
        });
    }
}

module.exports = PubSub;

// Uncomment the lines below to test the PubSub functionality
// const checkPubSub = new PubSub({ blockchain: { chain: [] } });
// setTimeout(() => checkPubSub.publisher.publish(CHANNELS.TEST, "Hellooo"), 1000);
