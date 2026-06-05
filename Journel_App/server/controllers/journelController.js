const Journel = require("../models/journel");
const asyncHandler = require("../utils/asyncHandler");

const getJorunels = asyncHandler(async (req, res) => {
    const journel = await Journel.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json(journel);
})

const getJournel = asyncHandler(async (req, res) => {
    const journel = await Journel.findById(req.params.id);
    if (!journel) {
        return res.status(404).json({
            message: "Journal not found",
        });
    }
    res.status(200).json(journel);
});

const createJournels = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title are required!" })
    }
    const journel = await Journel.create({
        title,
        content,
        user: req.user.id,
    });
    res.status(201).json(journel);
})

const updateJournel = asyncHandler(async (req, res) => {
    const journel = await Journel.findById(req.params.id);

    if (!journel) {
        return res.status(404).json({ message: "Journel not found", });
    }

    if (journel.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Access denied", });
    }
    const updatedJournel = await Journel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    res.status(200).json(updatedJournel);
})

const deleteJournel = asyncHandler(async (req, res) => {
    const journel = await Journel.findById(req.params.id);

    if (!journel) {
        return res.status(404).json({ message: "Journal not found", });
    }

    if (journel.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Access denied", });
    }

    await Journel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Journal deleted successfully", });
})

module.exports = { getJorunels, getJournel, createJournels, updateJournel, deleteJournel };