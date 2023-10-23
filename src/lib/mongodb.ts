import { Db, MongoClient } from 'mongodb';

declare global {
  var mongoDbPromise: Promise<Db>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: MONGODB_URI');
}

const mongoUri = process.env.MONGODB_URI;
const options = {};
const dbName = 'polly';

export async function connectDB(): Promise<Db> {
  if (!global.mongoDbPromise) {
    global.mongoDbPromise = new MongoClient(mongoUri, options)
      .connect()
      .then(client => client.db(dbName))
      .then(async db => {
        await db.collection('polls').createIndex({ id: 1 }, { unique: true });
        return db;
      });
  }

  return global.mongoDbPromise;
}
