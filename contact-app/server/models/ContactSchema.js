const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    Phone: {
        type: String,
        required: true
    }
}, { timestamps: true });

const contact = mongoose.model("contact", contactSchema);

module.exports = contact;