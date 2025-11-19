const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_KEY;

function createToken(user){
    const payload = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
    }

    const token = jwt.sign(payload,secretKey);

    return token;
}


function validateToken(token){
    const payload = jwt.verify(token,secretKey);

    return payload;
}

module.exports = {
    createToken,
    validateToken,
}
