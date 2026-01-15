//logic that connect to the database
import mongoose from "mongoose";
export  const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pooja:Tg1379%23%23@cluster0.2leyzwe.mongodb.net/foodDeliveryApp?retryWrites=true&w=majority').then(()=> console.log("MongoDB connected"));
    }