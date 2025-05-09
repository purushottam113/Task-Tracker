const express = require("express");
const app = express();
const User = require("../modules/user.js")
const bcrypt = require('bcrypt');
const validator = require('validator');
const authRouter =  express.Router();

// Login
authRouter.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body

        const isEmail = validator.isEmail(email);
        if(!isEmail){
            throw new Error("Invalide Email..")
        }

        const user = await User.findOne({email: email})

        if(!user){
            throw new Error("Invalide Creditionals..")
        }

        const isPasswordValid = await user.isPasswordValid(password);
        if(!isPasswordValid){
            throw new Error("Invalide Creditionals..") 
        }   
        else{
            //Create Token
            const jwtToken = await user.getJWT()

            // Send user Token
            res.cookie("token", jwtToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                expires: new Date(Date.now() + 604800000)});
            res.send(user)
        }   

    } catch (err) {
        res.status(400).json({message:  err.message})
    }
})

// signup route
authRouter.post("/signup", async (req,res)=>{
    try{
        // encrypt the password
        const {name, email, password, country} = req.body

        if(!name){
            throw new Error("Please enter the name");
        }
        else if(!country){
            throw new Error("Enter a country name");
        }
        else if(!validator.isEmail(email)){
            throw new Error("Enter a valid Email ID");
        }
        else if(!validator.isStrongPassword(password)){
            throw new Error("Please enter a strong password")
        }

        const hashPassword = await bcrypt.hash(password,10)

        const validData = {
            name,
            email,
            password : hashPassword,
            country
        }

        const user = new User(validData)
        await user.save();

        //Create Token
        const jwtToken = await user.getJWT()
        // Send user Token
        res.cookie("token", jwtToken, { expires: new Date(Date.now() + 604800000)});

        res.json(user)
    }
    catch(err){
        res.status(400).json({message:  err.message})
    }
})

// Logout API
authRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logout Sucessful !!!"})
})

module.exports = authRouter;
