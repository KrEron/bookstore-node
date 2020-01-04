const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/book");

router.get("/", (req, res, next)=> {
    Book.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", (req, res, next)=> {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    book.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowa ksiazke",
            createdProduct: book
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.get("/:bookId", (req, res, next)=> {
    const id = req.params.bookId;
    Book.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:bookId", (req, res, next)=> {
    const id = req.params.bookId;
    Book.update({_id:id}, { $set: {
        name: req.body.name,
        price: req.body.price
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana ksiazki o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:bookId", (req, res, next)=> {
    const id = req.params.bookId;
    Book.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie ksiazki o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;