require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../modules/user")

const userAuth = async (req, res, next)=>{
    try {
       const token = req.cookies.token;
       if(!token){
           return res.status(401).send("Unauthorized User");
        }
        
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        const {_id} = decodedUser
       const user = await User.findById(_id);
       if(!user){
        return res.status(401).send("User Not Found");
       }
       req.user = user
       next()
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
}

module.exports = {userAuth}