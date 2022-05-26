const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asynchHandler = require('express-async-handler')
const User = require('../models/userModel')


//@desc register user
// @route /api/users
// @access Pulic
const registerUser = asynchHandler(async (req, res) => {
    const {name,email,password} = req.body
   
    // check empty fields
    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }

    //check if user already exists
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("User areadly exists")
    }

    // Hashed password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({ name, email,password: hashedPassword})

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new error("invalid user data")
    }
})

//@desc login user
// @route /api/users/login
// @access Pulic
const loginUser = asynchHandler(async (req, res) => {
    const {email,password} = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ 
            _id: user._id,
            name: user.name, 
            email: user.email,
            token:generateToken(user._id)
          })
    }else{
        res.status(400).json({message:"User couldn't be found"})
    }
})

//@desc user data
// @route /api/users/me
// @access Private
const getMe = asynchHandler(async (req, res) => {
    res.status(200).json(req.user)
  })

// Generate WebToken
const generateToken =  (id)=>{
     return jwt.sign({id},process.env.JWT_SECRET,{
         expiresIn: '30d'
     })
}


module.exports = {
    registerUser,
    loginUser,
    getMe

}