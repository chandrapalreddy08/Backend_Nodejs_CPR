
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv')

dotEnv.config()

const secretKey = process.env.whatIsYourName;
const verifyToken = async(req,res,next)=>{
    
    const token = req.headers.token;

    if(!token) {
        return res.status(401).json({erroe:"token is required"})
    }

    try {
        const decoded = jwt.verify(token,secretKey,)
        const vendor = await Vendor.findById(decoded.vendorId);

        if(!vendor) {
            res.status(401).json({error:"vendor not found"})
        }
        req.vendorId = vendor._id

        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"invalid Token"})
        
    }
}

module.exports = verifyToken