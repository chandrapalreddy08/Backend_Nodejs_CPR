
const Product = require('../models/Product');
const multer = require('../middleware/multer');
const Firm = require('../models/Firm')
const path = require('path')

const addProduct = async(req,res)=>{
    try {
        const {productName,price,category,bestSeller,description} = req.body;

        const image = req.file?req.file.filename:undefined;

        const firmId = req.params.firmId

        const firm = await Firm.findById(firmId);

        if(!firm) {
            return res.status(404).json({error:"no firm found"})
        }
        const product = new Product({
            productName,price,category,bestSeller,description,image,firm:firm
        })


        const savedProducts = await product.save()

        firm.products.push(savedProducts);

        await firm.save();

        res.status(200).json({savedProducts})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server Error"});

        
    }
}

const getProductByFirm = async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"no firm found"})
        }

        const restaurantName = await firm.firmName
        const products = await Product.find({firm:firmId})

        res.status(200).json({restaurantName,products})
    } catch (error) {
         console.log(error);
        res.status(500).json({error:"internal server Error"});
    }
}

const deleteProductById = async(req,res)=>{
    try {
        const productId = req.params.productId

        const deletedProduct = await Product.findByIdAndDelete(productId)

        if(!deletedProduct) {
            return res.status(404).json({error:"no product found"})
        }
    } catch (error) {
         console.log(error);
        res.status(500).json({error:"internal server Error"});
    }
}


module.exports = {addProduct,getProductByFirm,deleteProductById}