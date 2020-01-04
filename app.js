const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bookRoutes = require("./api/routes/books");
const ordersRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/users");

mongoose.connect("mongodb+srv://book:"+process.env.MONGO_PASS+"@bookstore-mqznc.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use("/books", bookRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", userRoutes);

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