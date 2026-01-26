import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"; //this is for token generation
import bcrypt from "bcrypt"; //this is for password hashing
import validator from "validator"; // this is for email validation




//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user exists
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }
        const isMatch =  await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        //if password matches
        const token = createToken(user._id); //create token for the user
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error logging in user" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}
    

//register user
const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    try {   
        //check if user already exists
        const exists = await userModel.findOne({ email: email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        //validate email and strong password
        if (!validator.isEmail(email)) {
            return  res.json({ success: false, message: "Please enter a valid email format" });
        }

        if(password.length < 8){
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);//password hasing and saved in hashedPassword

        //create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        
       const user = await newUser.save(); //saved the new user in the database
    const token = createToken(user._id); //create token for the user
    res.json({ success: true, message: "User registered successfully", token: token });

    }catch (error) {
        res.json({ success: false, message: "Error registering user"});
    }

}
export { loginUser, registerUser };
