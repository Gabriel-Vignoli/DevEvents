import mongoose from "mongoose";

// Define the cache type for better TypeScript support
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global variable to cache the connection across hot reloads in development
declare global {
  var mongooseCache: MongooseCache | undefined;
}

// Initialize the cache if it doesn't exist
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

const cached = global.mongooseCache;

/**
 * Connects to MongoDB using Mongoose with connection caching.
 * This prevents multiple connections during development hot reloads.
 * In production, the connection is established once.
 *
 * @returns Promise<typeof mongoose> - The Mongoose instance
 * @throws Error if MONGODB_URI environment variable is not set
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  // Check if MongoDB URI is provided
  if (!process.env.MONGODB_URL) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  // Create a new connection promise if one doesn't exist
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable mongoose buffering
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URL, opts)
      .then((mongooseInstance) => {
        console.log("New MongoDB connection established");
        return mongooseInstance;
      });
  }

  // Await the connection promise and cache the result
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
