const jwt = require("jsonwebtoken");
const User = require("../models/user");
const user = require("../models/user");

//Helper : Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
}

//@desc Register new User
//@route POST/api/auth/register
//@access Public

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message : "Please fill all fields"});
        }

        //check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).json({message : "User already existed"})
        }

        //create user
        if(user){
            res.status(201).json({
                _id : user.id,
                name : user.name,
                email : user.email,
                token : generateToken(user._id)
            })
        }else{
            res.status(400).json({message : "Invalid user data"})
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

//@desc Login new User
//@route POST/api/auth/login
//@access Public
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
};

//@desc Get current logged-in user
//@route GET/api/auth/me
//@access Private

exports.getMe = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
};

//@desc Update user profile
//@route PUT/api/auth/me
//@access Private

exports.updateUserProfile = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
};