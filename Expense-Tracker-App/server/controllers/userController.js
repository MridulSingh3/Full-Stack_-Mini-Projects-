const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExits = await User.findOne({ email });

    if (userExits) {
        return res.status(400).json({ message: "User Exits" })
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed
    })

    res.json({
        _id: user._id,
        token: generateToken(user._id),
    })
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400).json({ message: "Invalid credentials" });
    }
});

module.exports = {
    registerUser,
    loginUser
}