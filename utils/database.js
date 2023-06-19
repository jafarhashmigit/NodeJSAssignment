const { MongoClient } = require('mongodb');
const mongoURL = 'mongodb://localhost:27017/mydatabase';

let db;

async function connectToDatabase() {
  try {
    const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

function getCollection(collectionName) {
  return db.collection(collectionName);
}

module.exports = {
  connectToDatabase,
  getCollection,
};