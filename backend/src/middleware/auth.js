const jwt = require('jsonwebtoken');
const User = require("../modules/user")

const userAuth = async (req, res, next)=>{
    try {
       const token = req.cookies.token;
       if(!token){
           return res.status(401).send("Unauthorized User123");
        }
        
        const decodedUser = jwt.verify(token, "Moonlight")
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