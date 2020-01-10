const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Book = require("../models/book");
const checkAuth = require("../middleware/check-auth")

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, "./uploads/");
    },
    filename: function(req,file,cb) {
        cb(null, new Date().toISOString().replace(':','_').replace(':','_') + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true) 
    }else{
        cb(null, false)
    }

}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024*1024*5},
    fileFilter: fileFilter
});

router.get("/", checkAuth, (req, res, next)=> {
    Book.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", checkAuth, upload.single("bookImg"), (req, res, next)=> {
    console.log(req.file);
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        bookImg: req.file.path
    });
    book.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowa ksiazke",
            createdBook: book
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

router.patch("/:bookId", checkAuth,upload.single("bookImg"), (req, res, next)=> {
    const id = req.params.bookId;
    console.log(req.file);
    Book.update({_id:id}, { $set: {
        name: req.body.name,
        price: req.body.price,
        bookImg: req.file.path
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana ksiazki o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:bookId", checkAuth, (req, res, next)=> {
    const id = req.params.bookId;
    Book.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie ksiazki o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;
