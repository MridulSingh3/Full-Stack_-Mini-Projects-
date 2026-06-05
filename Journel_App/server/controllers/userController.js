const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");
const generateTokens = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User Exists" })
    }

    const hashed = await bcryptjs.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed
    })
    res.json({
        _id: user._id,
        token: generateTokens(user._id)
    })
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcryptjs.compare(password, user.password))) {
        res.json({
            _id: user._id,
            token: generateTokens(user._id)
        })
    }
    else {
        res.status(400).json({ message: "Invalid credentials" });
    }
})

module.exports = {
    registerUser,
    loginUser
}