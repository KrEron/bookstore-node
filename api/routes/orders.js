const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Order = require("../models/order");
const checkAuth = require("../middleware/check-auth")

router.get("/", (req,res,next)=>{
    Order.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
});

router.post("/", (req,res,next)=>{
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        book_id: req.body.book_id,
        count: req.body.count
    });
    order.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowe zamówienie",
            createdProduct: order
        });
    })
    .catch(err => res.status(500).json({error: err})); 
});

router.get("/:id_order", checkAuth, (req,res,next) =>{
    const id = req.params.id_order;
    Order.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    }).catch(err => res.status(500).json({error: err}));
});
router.delete("/:id_order", checkAuth, (req,res,next) =>{
    const id = req.params.id_order;
    Order.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "usunięcie zamówienia o nr "+id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});
module.exports = router;
