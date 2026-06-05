const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.SECERT_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }
    else {
        res.status(401);
        throw new Error("No token");
    }
})
module.exports = protect;