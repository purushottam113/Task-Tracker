require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const connectDB = require('../../src/config/database');
const authRouter = require('../../src/routes/auth');
const projectRouter = require('../../src/routes/project');
const taskRouter = require('../../src/routes/task');
const serverless = require('serverless-http');

const PORT = process.env.PORT

connectDB()
    .then(()=> {
        console.log("DB Connected");
        app.listen(PORT, ()=> {
            console.log("server running....");
        })
    })
    .catch((err)=> {
        console.error("DB not connected");
    })

app.use(cors({
    // origin: "http://localhost:5173",
    origin: "https://project-task-tracker.netlify.app",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", projectRouter);
app.use("/", taskRouter);

app.use("/", (req, res)=> {
    res.send("HomePage on 3000")
})

module.exports.handler = serverless(app);