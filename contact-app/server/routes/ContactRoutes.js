const express = require("express");
const router = express.Router();

const { getContact,
    createContact,
    getContactById,
    updateContact,
    deleteContact
} = require("../controllers/ContactControllers");

router.get("/", getContact);
router.post("/", createContact);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;