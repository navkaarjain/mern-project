const jwt = require('jsonwebtoken');
const express=require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");

require('../db/conn');
const User = require("../model/userSchema");

router.get("/",(req,res)=>{
    res.send(`hello in home page auth.js`)
});

router.post("/register", async(req,res)=>{
const { name,email,phone,work,password,cpassword} = req.body;

if(!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({error:"plz filled the field properly"});
} 

try{
    
   const userExists =await User.findOne({email:email});

   

   if(userExists){
    return res.status(422).json({error:"email already exits"});
}else if(password != cpassword){
    return res.status(422).json({error:"password are not matching"});
}else{
    const user = new User( {name,email,phone,work,password,cpassword});

    await user.save();
    
    res.status(201).json({message:"user registered successfully"});
}

}catch(err){
    console.log(err);
}
});

//login route

router.post('/signin', async(req,res)=>{
    //console.log(req.body);
    //res.json({message:"awesome"})
    try{
        let token;
        const {email,password} = req.body;

        if (!email || !password){
            return res.status(400).json({error:"plz filled the data"})
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);


            token =  await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+ 25892000000),
                httpOnly : true
            })

            if(!isMatch){
                res.status(400).json({error:"invalid creadiential"});
            }else{
                res.json({message:"user sigin successfully"});
            
            }

        }else{
            res.status(400).json({error:"invalid creadiential"});
        }


    
    }catch(err){
console.log(err);
    }
//about us ka page

router.get("/about", authenticate ,(req,res)=>{
  console.log(`hello in about page`);
  res.send({success : true});
});

    //logout ka page
   router.get("/logout",(req,res)=>{
        console.log(`hello my logout page`);
      res.clearCookie('jwtoken',{path:'/'});
        res.status(200).send('user logout');
  })
    
})
module.exports = router;