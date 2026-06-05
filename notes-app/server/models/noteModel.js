const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const notes = mongoose.model("Note", noteSchema);

module.exports = notes;

