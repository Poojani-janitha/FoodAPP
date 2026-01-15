import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer"; // store images
 
const foodRouter = express.Router();//using this we can create routes get post put delete


//send the data on the server
foodRouter.post("/add",addFood);


//image storage engine
const storage = multer.diskStorage({
    destination:"uploads ",
    filename:(req,file,cb)=>{
        return cb(null, '${Date.now()}${file.originalname}');
    }
})

const upload = multer({storage:storage});//image store in uploads folder
foodRouter.post("/add",upload.single("image"),addFood);
export default foodRouter;//route to add food item