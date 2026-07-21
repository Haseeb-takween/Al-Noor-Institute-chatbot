import mongoose from "mongoose";

/**
 * Cached mongoose connection for Next.js / Vercel serverless.
 * Short timeouts = fail fast when Atlas IP allowlist blocks Vercel (no long hangs).
 */
declare global {
  // eslint-disable-next-line no-var
  var _alnoorMongoose: Promise<typeof mongoose> | undefined;
}

const CONNECT_OPTS: mongoose.ConnectOptions = {
  maxPoolSize: 5,
  // Keep short so a blocked Atlas IP never stalls chat/enrol/admin for 10s+.
  serverSelectionTimeoutMS: 2_500,
  socketTimeoutMS: 10_000,
  connectTimeoutMS: 2_500,
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
  return connectDBQuick(2_500);
}

/** Give up after `ms` so user-facing routes stay fast if Atlas is unreachable. */
export async function connectDBQuick(ms = 2_000): Promise<boolean> {
  if (!isDbConfigured()) return false;
  try {
    const result = await Promise.race([
      connectDB().then(() => mongoose.connection.readyState === 1),
      new Promise<false>((resolve) => setTimeout(() => resolve(false), ms)),
    ]);
    return result;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    return false;
  }
}
