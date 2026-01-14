import express from "express"
import cors from "cors"


const app = express()
const port =4000;

//middleware
//message pass using json
app.use(express.json());
//access backend from frontend
app.use(cors())


//http method to request data form server
app.get("/",(req,res)=>)

