
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.whatIsYourName



const vendorRegister = async(req,res)=>{
    const {username,email,password} = req.body

    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("email already taken");
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const newVendor = new Vendor({
            username,
            email,
            password:hashedPassword
        });

        await newVendor.save()

        res.status(201).json({message:"Vendor registred sucessfully"});
        console.log("registred");
        
    }catch(error){
        console.log(error);
        
        res.status(500).json({error:"Internel server Error"})
    };
    
}

const vendorLogin = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const vendor = await Vendor.findOne({email});
        if(!vendor) {
            return res.status(401).json({error:"invalid username"})
        }
        const vendorp = await bcrypt.compare(password,vendor.password);
        
        if(!vendorp) {
            return res.status(401).json({error:"invalid  password"})
        }

        const token = jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})

        const vendorId = vendor._id
        res.status(200).json({sucees:"Login sucessfull",token,vendorId})
        console.log(email,token);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internel Server Error"})
        
    }
}

const getAllVendors = async(req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({vendors})
    } catch (error) {
        console.log(error);
         res.status(500).json({error:"Internel Server Error"});
    }
}

const getVendorById = async(req,res)=>{
    const vendorId = req.params.id;

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm')  ;
        if(!vendor) {
            return res.status(404).json({error:"vendor not found"})
        }

        const vendorFirmid = vendor.firm[0]._id

        res.status(200).json({vendorId,vendorFirmid,vendor });

        console.log(vendorFirmid);
        
    } catch (error) {
        console.log(error);
         res.status(500).json({error:"Internel Server Error"});
        
    }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById}