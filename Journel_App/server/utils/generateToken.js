const jwt = require("jsonwebtoken");

const generateTokens = (id) => {
    return jwt.sign({ id }, process.env.SECERT_KEY, { expiresIn: "3d" })
}
module.exports = generateTokens;