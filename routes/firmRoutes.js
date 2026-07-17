
const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/multer');



const router = express.Router()

router.post('/add-firm',verifyToken,upload.single('image'),firmController.addFirm);

router.get('uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('content-type','image/jpeg');
    res.sendFile(Path.join(__dirname, '..', 'uploads',imageName));
})

router.delete('/:firmId',firmController.deleteFirmById)
module.exports = router;
