
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path')


 

const addFirm = async(req,res)=>{
   try {
     const {firmName,area,category,region,offer} = req.body

    const image = req.file?req.file.filename:undefined;

   

    const vendor = await Vendor.findById(req.vendorId)

    if(!vendor) {
       return res.status(400).json({message:"vendor not found"})
    }

     if(vendor.firm.length > 0){
        return res.status(400).json({message:"vendor can have only one firm "})
    }

    const firm = new Firm ({
        firmName,area,category,region,offer,image,vendor:vendor.id
    })

    
  
    const savedFirm = await firm.save();
     console.log("Saved Firm:", savedFirm);


    const firmId =savedFirm._id
    console.log("Firm ID:", savedFirm._id);
   
    vendor.firm.push(savedFirm)

    await vendor.save()

   


    return res.status(200).json({message:"firm added sucessfully",firmId} )
   } catch (error) {
     console.log(error);
    return res.status(500).json({
        message: error.message,
        error: error
    });
    
   }

  



}

const deleteFirmById = async(req,res)=>{

    try{
    const firmId = req.params.firmId;

    const deletedFirm = await Firm.findByIdAndDelete(firmId)

     if(!deletedFirm) {
            return res.status(404).json({error:"no product found"})
        }
    } catch (error) {
         console.log(error);
        res.status(500).json({error:"internal server Error"});
    }
}

 module.exports = {addFirm,deleteFirmById}