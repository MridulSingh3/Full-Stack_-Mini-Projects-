const mongoose = require("mongoose");

const journelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timeStamps: true })

const Journel = mongoose.model("Journel", journelSchema);

module.exports = Journel;