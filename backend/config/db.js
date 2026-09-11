import mongoose from "mongoose";

export const connectDB = async () => {
const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  // Avoid deprecation noise & make queries fall fast instead of buffreing forever
  mongoose.set("strictQuery", true);

  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000, // 10 seconds timeout for server selection
  });

  console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  return conn;
};