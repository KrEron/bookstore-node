const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
    User.findOne({email: req.body.email}).exec()
    .then(user => {
        if(user){
            res.status(409).json({message: "Mail już istnieje"});
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash)=> {
                if(err) {
                    return res.status(500).json({error: err});
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                        console.log(result)
                        return res.status(201).json({message: "Utworzono użytkownika"});
                    })
                    .catch(err => {
                        return res.status(500).json({error: err});
                    });
                }
            
            });
        }
    })
    .catch(err => {
       res.status(500).json({error: err});
    });
});

router.delete("/:userId", (req, res, next)=> {
    User.findByIdAndRemove(req.params.userId).exec()
    .then(result => {
        res.status(200).json({message: "Użytkownik został skasowany"});
    })
    .catch(err => {
        res.status(500).json({error: err});
     });
});

router.post("/login", (req, res, next) => {
    User.findOne({email: req.body.email}).exec()
    .then(user => {
        if(!user) {
            return res.status(401).json({message: "Błąd autoryzacji"});
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err) {
                return res.status(401).json({message: "Błąd autoryzacji"});
            }
            if(result) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, process.env.JWT_KEY, {expiresIn: "1h"});
                return res.status(200).json({message: "Autoryzacja poprawna", token: token});
            }
            return res.status(401).json({message: "Błąd autoryzacji"});
        });
    })
    .catch(err => {
        return res.status(500).json({error: err});
    });
});

module.exports = router;