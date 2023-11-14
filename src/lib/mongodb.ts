import { Db, MongoClient } from 'mongodb';

declare global {
  var _mongoDbPromise: Promise<Db>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: MONGODB_URI');
}

let mongoDbPromise: Promise<Db>;

async function connect() {
  return new MongoClient(process.env.MONGODB_URI!, {})
    .connect()
    .then(client => client.db('polly'))
    .then(async db => {
      await db.collection('polls').createIndex({ id: 1 }, { unique: true });
      return db;
    });
}

export async function connectDB(): Promise<Db> {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoDbPromise) {
      global._mongoDbPromise = connect();
    }
    return global._mongoDbPromise;
  } else {
    if (!mongoDbPromise) {
      mongoDbPromise = connect();
    }
    return mongoDbPromise;
  }
}
