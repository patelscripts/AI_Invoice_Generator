const Invoice = require("../models/invoice")

//@desc Create new invoice
//@route POST/api/invoices
//@access Private

exports.createInvoice = async (req , res) =>{
    try{
        const{
            invoiceNumber,
            invoiceDate,
            dueDate,
            billFrom,
            billTo,
            items,
            notes,
            paymentTerms
        } = req.body;

        //subtotal calculations
        let subtotal = 0;
        let taxTotal = 0;
        items.forEach((item) =>{
            subtotal += item.unitPrice * item.quantity;
            taxTotal += ((item.unitPrice * item.quantity) * (item.taxPercent || 0))/ 100;
        });

        const total = subtotal + taxTotal;

        const invoice = new Invoice({
            user : req.user,
            invoiceNumber,
            invoiceDate,
            dueDate,
            billFrom,
            billTo,
            items,
            notes,
            paymentTerms,
            subtotal,
            taxTotal, 
            total
        });
        await invoice.save();
        res.status(201).json(invoice)
    }catch(error){
        res.status(500).json({message : "Error creating invoices", error: error.message})
    }
};

//@desc get all invoices of logged in-user
//@route GET/api/invoices
//@access Private
exports.getInvoices = async(req, res) =>{
    try{
        const invoices = await Invoice.find().populate("user","name email");
        res.json(invoices);
    }catch(error){
        res.status(500).json({message : "Error Fetching invoices", error: error.message})
    }
}

//@desc get single invoice by ID
//@route GET/api/invoices/:id
//@access Private
exports.getInvoiceById = async(req, res) =>{
    try{
    }catch(error){
        res.status(500).json({message : "Error creating invoices", error: error.message})
    }
}

//@desc update invoice
//@route PUT/api/invoices/:id
//@access Private
exports.updateInvoice = async(req, res) =>{
    try{
    }catch(error){
        res.status(500).json({message : "Error creating invoices", error: error.message})
    }
}

//@desc delete invoice
//@route DELETE/api/invoices/:id
//@access Private
exports.deleteInvoice = async(req, res) =>{
    try{
    }catch(error){
        res.status(500).json({message : "Error creating invoices", error: error.message})
    }
}

