const mongoose = require('mongoose');
const User = require("./users");

const project = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.isObjectIdOrHexString,
        ref: User,
        required: true,
    },
})

const Project = new mongoose.model("Project", project);
module.exports = Project;