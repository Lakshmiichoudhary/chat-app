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
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            pic
        });

        if (user) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              pic: user.pic,
              token: generateToken(user._id),
            });
        }
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ message: "Failed to create a user" });
    }        
} 

exports.signinUser = async (req,res) => {
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

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
          });  
    } catch (err) {
        console.error("Error during login:", err);
        res.status(404).json({ message: "User not found" });
    }
}

exports.getUser = async (req, res) => {
    const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
}
