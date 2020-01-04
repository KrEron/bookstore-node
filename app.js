const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRoutes = require("./api/routes/books");


mongoose.connect("mongodb+srv://book:"+process.env.MONGO_PASS+"@bookstore-mqznc.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/books", productRoutes);


app.use((req,res,next)=>{
    const error = new Error("Not found.");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});

module.exports = app;