const mongoose = require('mongoose');

const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://shreepadtulse:z6lM2vdY9lehFmTP@tracktrackercluster.txqsgk7.mongodb.net/?retryWrites=true&w=majority&appName=TrackTrackerCluster")
}

module.exports = connectDB