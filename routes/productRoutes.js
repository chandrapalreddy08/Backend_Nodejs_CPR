
const express = require('express');
const productController = require('../controllers/productController');
const multer = require('../middleware/multer');
const upload = require('../middleware/multer');
const Product = require('../models/Product');

const router = express.Router();

router.post('/add-product/:firmId',upload.single('image'),productController.addProduct);
router.get('/products/:firmId',productController.getProductByFirm);

router.get('uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('content-type','image/jpeg');
    res.sendFile(Path.join(__dirname, '..', 'uploads',imageName));
})

router.delete('/:productId',productController.deleteProductById)


module.exports = router;