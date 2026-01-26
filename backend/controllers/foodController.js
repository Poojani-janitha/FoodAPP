import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
    try {
        let image_filename = req.file ? `${req.file.filename}` : 'default.jpg';
        
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        })
        
        await food.save();
        res.json({success:true, message:"Food item added successfully"});
    } catch (error) {
        console.log("Error in addFood:", error);
        res.status(500).json({success:false, message:"Error adding food item", error: error.message});
    }   
}

//all food list
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error fetching food items"});
    }
}

//remove food item
const removeFood = async(req,res)=>{
    try{
        const foodId = req.body.id;
        
        if (!foodId) {
            return res.status(400).json({success:false, message:"Food ID is required"});
        }

        const food = await foodModel.findById(foodId);
        
        if (!food) {
            return res.status(404).json({success:false, message:"Food item not found"});
        }

        // Delete image file if it exists and is not default
        if (food.image && food.image !== 'default.jpg') {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.log("Error deleting image:", err);
            });
        }

        await foodModel.findByIdAndDelete(foodId);
        res.json({success:true, message:"Food item removed successfully"}); 
    }catch(error){
        console.log("Error in removeFood:", error);
        res.status(500).json({success:false, message:"Error removing food item", error: error.message});  
    }
}
export { addFood,listFood ,removeFood };