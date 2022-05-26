const jwt = require('jsonwebtoken')
const asynchHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asynchHandler( async(req,res,next)=>{
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{

            // verify token
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')
            next()
            
        }catch(error){
            console.log(error);
            res.status(401)
            throw new Error("Not aithorized")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("Not authorized (No token)")
    }
})

module.exports = {
    protect,
}