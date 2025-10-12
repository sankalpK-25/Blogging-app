const mongoose = require("mongoose");

const {createHmac, randomBytes} = require("crypto")
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type : String,
        required: true,
        default: "/profile-photos/default.png"
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
}, {timestamps: true});

userSchema.pre("save", function (next) {
    const user = this;

    if(!user.isModified("password")) return;

    const salt =  randomBytes(16).toString();

    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");

    user.salt = salt;
    user.password = hashedPassword;

    next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
