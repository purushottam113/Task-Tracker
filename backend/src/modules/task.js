const mongoose = require('mongoose');
const Project = require('./project');

const task = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date,
    },
    project: {
        type: mongoose.ObjectId,
        ref: Project, 
        required: true,
    }
});

module.exports = mongoose.model('Task', task);