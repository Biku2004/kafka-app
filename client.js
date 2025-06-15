// importing kafka
const {Kafka} = require("kafkajs");

// creating a client
exports.kafkaClient = new Kafka({
    clientId: "my-app",
    brokers: ['192.168.18.26:9092'],

});