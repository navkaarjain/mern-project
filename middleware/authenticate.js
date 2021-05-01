const jwt = require("jsonwebtoken");
const User = require("../model/userSchema")
const Authenticate = async (req,res,next) =>{
    try{
        const token =req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUSer = await User.findOne({_id:verifyToken._id, "tokens.token": token});

        if(!rootUser){throw new Error('user not found')}
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    }catch(err){
        res.status(401).send('unauthorized:No token provided');
        console.log(err);

    }
}
module.export =  Authenticate;