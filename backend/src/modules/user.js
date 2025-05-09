require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.methods.getJWT = async function() {
    const user = this;
    const jwtToken = await jwt.sign({_id: user._id}, process.env.JWT_SECRET,
                    {expiresIn: '1d'})
    return jwtToken;
}

userSchema.methods.isPasswordValid = async function(userInputPassword){
    const user = this;
    const hashPassword = user.password;

    const isPasswordValid = await bcrypt.compare(userInputPassword, hashPassword);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;