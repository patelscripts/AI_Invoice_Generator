const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{type : String, required : true},
    quantity : {type : Number, required : true},
    unitPrice:{type : Number, required : true},
    taxPercent : {type : Number, default : 0},
    total :{type:Number, required: true}
})

const invoiceSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    invoiceDate:{
        type : Date,
        default : Date.now,
    },
    dueDate:{
        type : Date
    },
    billForm : {
        businessName : String,
        email : String,
        address : String,
        phone : String,
    },
    items : [itemSchema],
    notes : {
        type : String,
    },
    paymentTerms : {
        type : String,
        deafult : "Net 15",
    },
    status:{
        type : String,
        enum : ["Paid", "UnPaid"],
        deafult : "UnPaid"
    },
    subtotal : Number,
    taxtotal : Number,
    total : Number
},
{timestamps:true}
);

module.exports = mongoose.model("Invoice", invoiceSchema);