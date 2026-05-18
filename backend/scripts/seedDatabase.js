import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import 'dotenv/config.js'

const foodList = [
    {
        name: "Greek salad",
        image: "food_1",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Veg salad",
        image: "food_2",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Clover Salad",
        image: "food_3",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Chicken Salad",
        image: "food_4",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        name: "Lasagna Rolls",
        image: "food_5",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Peri Peri Rolls",
        image: "food_6",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Chicken Rolls",
        image: "food_7",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Veg Rolls",
        image: "food_8",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        name: "Ripple Ice Cream",
        image: "food_9",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Fruit Ice Cream",
        image: "food_10",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Jar Ice Cream",
        image: "food_11",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Vanilla Ice Cream",
        image: "food_12",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        name: "Chicken Sandwich",
        image: "food_13",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Fried Chicken",
        image: "food_14",
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Grilled Sandwich",
        image: "food_15",
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Bread Sandwich",
        image: "food_16",
        price: 8,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        name: "Cup Cake",
        image: "food_17",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Butterscotch Cake",
        image: "food_18",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Sliced Cake",
        image: "food_19",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Vegan Cake",
        image: "food_20",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        name: "Carrot Pasta",
        image: "food_21",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Tomato Pasta",
        image: "food_22",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Creamy Pasta",
        image: "food_23",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        name: "Chicken Pasta",
        image: "food_24",
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        name: "Buttered Noodles",
        image: "food_25",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Veg Noodles",
        image: "food_26",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Soya Noodles",
        image: "food_27",
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Hakka Noodles",
        image: "food_28",
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Cooked Noodles",
        image: "food_29",
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Rice Noodles",
        image: "food_30",
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Egg Fried Rice",
        image: "food_31",
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        name: "Fried Rice",
        image: "food_32",
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
];

const seedDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            console.error("MONGODB_URI is not set in .env");
            process.exit(1);
        }

        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");

        // Clear existing food data
        await foodModel.deleteMany({});
        console.log("Cleared existing food data");

        // Insert new food data
        const result = await foodModel.insertMany(foodList);
        console.log(`✅ Successfully seeded ${result.length} food items!`);

        // Close connection
        await mongoose.disconnect();
        console.log("Database connection closed");
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
