import mongoose from "mongoose";

/**
 * Cached mongoose connection for Next.js / Vercel serverless.
 * Avoid minPoolSize — it stalls cold starts on Hobby timeouts.
 */
declare global {
  // eslint-disable-next-line no-var
  var _alnoorMongoose: Promise<typeof mongoose> | undefined;
}

const CONNECT_OPTS: mongoose.ConnectOptions = {
  maxPoolSize: 5,
  serverSelectionTimeoutMS: 4_000,
  socketTimeoutMS: 20_000,
  connectTimeoutMS: 4_000,
  bufferCommands: false,
};

export function isDbConfigured(): boolean {
  return !!process.env.MONGODB_URI;
}

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in environment variables.");

  if (mongoose.connection.readyState === 1) return mongoose;

  if (!global._alnoorMongoose) {
    global._alnoorMongoose = mongoose.connect(uri, CONNECT_OPTS).then((m) => {
      console.log("Connected to MongoDB");
      return m;
    });
    global._alnoorMongoose.catch(() => {
      global._alnoorMongoose = undefined;
    });
  }

  return global._alnoorMongoose;
}

/** Connects but never throws — returns whether a DB connection is available. */
export async function connectDBSafe(): Promise<boolean> {
  if (!isDbConfigured()) return false;
  try {
    await connectDB();
    return mongoose.connection.readyState === 1;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    return false;
  }
}

/** Like connectDBSafe, but gives up after `ms` so chat never blocks on Atlas. */
export async function connectDBQuick(ms = 3_000): Promise<boolean> {
  if (!isDbConfigured()) return false;
  try {
    const result = await Promise.race([
      connectDB().then(() => mongoose.connection.readyState === 1),
      new Promise<false>((resolve) => setTimeout(() => resolve(false), ms)),
    ]);
    return result;
  } catch (err) {
    console.error("MongoDB quick connect failed:", err);
    return false;
  }
}
