const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number,
    bookImg: String
});

module.exports = mongoose.model("Book", bookSchema);

