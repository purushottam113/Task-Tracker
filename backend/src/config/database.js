require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async ()=> {
    const mongo_URL = process.env.MONGO_URI
    await mongoose.connect(mongo_URL)
}

module.exports = connectDB