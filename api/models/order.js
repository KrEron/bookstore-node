const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    book_id: String,
    count: Number
});

module.exports = mongoose.model("Order", orderSchema);