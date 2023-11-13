import { Db, MongoClient } from 'mongodb';

declare global {
  var _mongoDbPromise: Promise<Db>;
}

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: MONGODB_URI');
}

let mongoDbPromise: Promise<Db>;

async function connect() {
  console.log('mongodb > connect');
  return new MongoClient(process.env.MONGODB_URI!, {})
    .connect()
    .then(client => client.db('polly'))
    .then(async db => {
      console.log('mongodb > create index');
      await db.collection('polls').createIndex({ id: 1 }, { unique: true });
      return db;
    });
}

export async function connectDB(): Promise<Db> {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoDbPromise) {
      console.log('mongodb > create global connection promise');
      global._mongoDbPromise = connect();
    }
    return global._mongoDbPromise;
  } else {
    if (!mongoDbPromise) {
      console.log('mongodb > create local connection promise');
      mongoDbPromise = connect();
    }
    return mongoDbPromise;
  }
}
