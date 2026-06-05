const contact = require("../models/ContactSchema");

exports.getContact = async (req, res) => {
    try {
        const contacts = await contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createContact = async (req, res) => {
    try {
        const { Name, Email, Phone } = req.body;

        if (!Name || !Phone) {
            return res.status(400).json({ message: "fill the required field" })
        }
        const contactData = await contact.create({ Name, Email, Phone });

        res.status(201).json(contactData);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getContactById = async (req, res) => {
    try {
        const getContact = await contact.findById(req.params.id);

        if (!getContact) {
            return res.status(404).json({ message: "No Contact Found!" })
        }
        res.status(200).json(getContact);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateContact = async (req, res) => {
    try {
        const getContact = await contact.findById(req.params.id);

        if (!getContact) {
            return res.status(404).json({ message: "No Contact Found!" })
        }

        if (req.body.Name !== undefined) {
            getContact.Name = req.body.Name;
        }
        if (req.body.Email !== undefined) {
            getContact.Email = req.body.Email;
        }
        if (req.body.Phone !== undefined) {
            getContact.Phone = req.body.Phone;
        }
        const updated = await getContact.save();

        res.status(200).json(updated);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteContact = async (req, res) => {
    try {
        const getContact = await contact.findById(req.params.id);

        if (!getContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        await getContact.deleteOne();

        res.status(200).json({ message: "Contact deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};