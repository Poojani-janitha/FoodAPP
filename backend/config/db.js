// Logic to connect to MongoDB.
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error("MONGODB_URI is not set in backend/.env");
        }

        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};