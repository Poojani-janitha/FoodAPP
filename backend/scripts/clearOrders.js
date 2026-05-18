import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `${__dirname}/../.env` });

const clearOrders = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not set");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const result = await Order.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} orders from the database`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("Error clearing orders:", error.message);
    process.exit(1);
  }
};

clearOrders();
