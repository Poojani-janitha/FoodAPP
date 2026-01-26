import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config.js'


const app = express()
const port =4000;

//middleware
//message pass usin  g json
app.use(express.json());
//access backend from frontend
app.use(cors())


//http method to request data form server
app.get("/",(req,res)=>{
    res.send("API Working")
})
 //db connection
 connectDB(); 


 //api endpoints
 app.use("/api/food",foodRouter);
 app.use('/images', express.static('uploads')); // Serve images statically ,can acess images using this route
app.use("/api/users", userRouter);

//run the express server
app.listen(4000,()=>{
    console.log("Server is start on http://localhost:4000");

})
