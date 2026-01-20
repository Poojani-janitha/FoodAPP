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
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food item removed successfully"}); 
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error removing food item"});  

    }
}
export { addFood,listFood ,removeFood };