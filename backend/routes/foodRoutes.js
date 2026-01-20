import express from "express";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import multer from "multer"; // store images
 
const foodRouter = express.Router();//using this we can create routes get post put delete

//image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({storage:storage});//image store in uploads folder
foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood); //list food is  a function in controller file , this route is help to access it
foodRouter.delete("/remove",removeFood);
export default foodRouter;//route to add food item  