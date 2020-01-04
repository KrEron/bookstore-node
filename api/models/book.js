const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number
});

<<<<<<< HEAD
module.exports = mongoose.model("Book", bookSchema);
=======
module.exports = mongoose.model("Book", bookSchema);
>>>>>>> 24efded559e41542a25ca950a03bee46506e62d6
