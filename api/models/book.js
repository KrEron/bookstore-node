const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model("Book", bookSchema);

