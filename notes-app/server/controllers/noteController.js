const Notes = require("../models/noteModel");

exports.getNotes = async (req, res) => {
    try {
        const notes = await Notes.find().sort({ createdAt: -1 });
        res.status(200).json(notes);// json data bhej raha hai
    }
    catch (err) {
        res.status(500).json({ message: err.message })//server error
    }
}

exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title) {
            return res.status(400).json({ message: "title is required" });// bad requests
        }
        const note = await Notes.create({ title, content });
        res.status(201).json(note);//resource created
    }
    catch (err) {
        res.status(500).status({ message: err.message })
    }
}

exports.getNoteById = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });// not found
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;

        const updated = await note.save();

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        await note.deleteOne();

        res.status(200).json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};