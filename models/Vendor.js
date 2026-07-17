
const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

const vendorSchema = new mogoose.Schema({
    username : {
        type:String,
        required :true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]
})

const Vendor = mongoose.model('Vendor',vendorSchema)

module.exports = Vendor