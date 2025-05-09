require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const authRouter = require('./routes/auth');
const projectRouter = require('./routes/project');
const taskRouter = require('./routes/task');

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
    origin: "http://localhost:5173",
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