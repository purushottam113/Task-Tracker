const mongoose = require('mongoose');
const User = require("./user");

const project = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.ObjectId,
        ref: User,
        required: true,
    },
})

const Project = new mongoose.model("Project", project);
module.exports = Project;