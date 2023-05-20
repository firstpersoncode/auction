import mongoose, { ConnectOptions, Mongoose } from "mongoose";
import "./Balance";
import "./Bid";
import "./Item";
import "./User";

const DB_URI: string = process.env.DB_URI as string;

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface CachedMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: CachedMongoose = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: true,
      // useCreateIndex: true,
    };

    cached.promise = mongoose.connect(DB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
