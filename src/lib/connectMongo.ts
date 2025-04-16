import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URL;

if (!MONGO_URI) {
  throw new Error("❌ MongoDB connection string is missing in .env.local");
}

let isConnected = false; // Track MongoDB connection status

const connectDB = async () => {
  if (isConnected) {
    console.log("🔄 Using existing MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);

    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
};

export default connectDB;
