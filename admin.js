const { kafkaClient } = require("./client");

async function init() {
    const admin = kafkaClient.admin();
    console.log("Admin connecting...");
    admin.connect();
    console.log("Admin connecting success");
    
    console.log("Creating topic [rider updates");
    await admin.createTopics({
        topics: [{
            topic: "rider-updated",
            numPartitions: 2 , 
        }],
    });

    console.log("topic created success [rider-update]"); 

    console.log("Disconnecting...")
    await admin.disconnect();
}

init();

