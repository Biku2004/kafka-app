# Kafka Application

A Node.js application demonstrating Apache Kafka producer, consumer, and admin operations using KafkaJS library.

## Project Structure

```
kafka-app/
├── .gitignore          # Git ignore file
├── admin.js            # Kafka admin operations
├── client.js           # Kafka client configuration
├── consumer.js         # Kafka consumer implementation
├── package.json        # Node.js dependencies
└── producer.js         # Kafka producer implementation
```

## Features

- **Kafka Client**: Centralized Kafka client configuration
- **Admin Operations**: Create topics and manage Kafka cluster
- **Producer**: Send messages to Kafka topics with partition routing
- **Consumer**: Subscribe to topics and consume messages in consumer groups
- **Interactive Producer**: Command-line interface for sending rider location updates

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Apache Kafka running on `192.168.18.26:9092`

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Biku2004/kafka-app.git
cd kafka-app
```

2. Install dependencies:
```bash
npm install
```

## Docker Setup for Kafka

This project uses Apache Kafka with Zookeeper using Docker containers. Follow these steps to set up the environment:

### Prerequisites

- Docker installed and running
- Network access to IP `192.168.18.26`

### Step 1: Start Zookeeper

First, start the Zookeeper container:

```bash
docker run -p 2181:2181 zookeeper
```

### Step 2: Start Kafka

In a new terminal, start the Kafka container:

```bash
docker run -p 9092:9092 \
  -e KAFKA_ZOOKEEPER_CONNECT=192.168.18.26:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.18.26:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka:7.2.1
```

### Step 3: Install Node.js Dependencies

Install the required KafkaJS library:

```bash
npm install kafkajs
```

### Environment Configuration

- **Zookeeper**: Running on `192.168.18.26:2181`
- **Kafka Broker**: Running on `192.168.18.26:9092`
- **Kafka Version**: Confluent Platform 7.2.1 (compatible with older Kafka features)

### Docker Container Management

To run containers in detached mode (background):

```bash
# Zookeeper (detached)
docker run -d -p 2181:2181 --name zookeeper zookeeper

# Kafka (detached)
docker run -d -p 9092:9092 \
  -e KAFKA_ZOOKEEPER_CONNECT=192.168.18.26:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.18.26:9092 \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  --name kafka \
  confluentinc/cp-kafka:7.2.1
```
## Usage

### 1. Create Topics (Admin)

First, create the required Kafka topics:

```bash
node admin.js
```

This creates a topic named `rider-updated` with 2 partitions.

### 2. Start Consumer(s)

Start one or more consumers with different group IDs:

```bash
# Terminal 1
node consumer.js user-1

# Terminal 2
node consumer.js user-2
```

### 3. Start Producer

Start the interactive producer:

```bash
node producer.js
```

Enter rider updates in the format: `<riderName> <location>`

Examples:
```
> John north
> Alice south
> Bob north
```

## How It Works

### Partitioning Strategy

The application uses location-based partitioning:
- Messages with location "north" go to partition 0
- All other locations go to partition 1

### Message Format

Messages are sent as JSON with the following structure:
```json
{
  "name": "riderName",
  "location": "location"
}
```

### Consumer Groups

Each consumer belongs to a consumer group. Messages are distributed among consumers in the same group, enabling load balancing and fault tolerance.

## Configuration

The Kafka client is configured in [`client.js`](client.js):
- **Client ID**: `my-app`
- **Brokers**: `192.168.18.26:9092`

To change the broker configuration, update the `brokers` array in [`client.js`](client.js).

