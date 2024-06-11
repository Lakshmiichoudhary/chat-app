const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : "30d",
    })
}

const salt = 10;

exports.registerUser = async (req,res) => {
    try{
        const {name,email,password,pic} = req.body;

        if(!name || !email || !password){
           return res.status(400).json({message : "Please Enter all the Fields"});
        }

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            pic
        });

        const token = generateToken(newUser.id);
        //console.log("user created" ,token)
        return res.status(201).json({ message: "User created", token });
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ message: "Failed to create a user" });
    }        
} 

exports.signUser = async (req,res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "wrong password" });
        }

        const token = generateToken(user.id);
        //console.log("Login successful, token:", token);
        return res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(404).json({ message: "User not found" });
    }
}
