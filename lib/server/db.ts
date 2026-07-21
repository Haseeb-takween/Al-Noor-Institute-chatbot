import mongoose from "mongoose";

/**
 * Cached mongoose connection.
 * In serverless / Next.js dev, modules re-evaluate, so we cache the connection
 * promise on `globalThis` to avoid opening a new connection on every request.
 */
declare global {
  // eslint-disable-next-line no-var
  var _alnoorMongoose: Promise<typeof mongoose> | undefined;
}

export function isDbConfigured(): boolean {
  return !!process.env.MONGODB_URI;
}

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in environment variables.");

  if (mongoose.connection.readyState === 1) return mongoose;

  if (!global._alnoorMongoose) {
    global._alnoorMongoose = mongoose.connect(uri).then((m) => {
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
    return true;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    return false;
  }
}
