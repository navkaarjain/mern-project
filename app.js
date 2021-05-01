const dotenv = require("dotenv");
const mongoose=require("mongoose");
const express = require("express");
const app = express();

dotenv.config({path: './config.env'});
require('./db/conn');
//const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'))

const PORT = process.env.PORT;
 

//middleware
//const middleware=(req,res,next)=>{
  //  console.log(`hello middleware`)
    //next();
//}

//app.get("/",(req,res)=>{
  //  res.send(`hello in home page app.js`)
//})
//app.get("/about",(req,res)=>{
  // res.send(`hello in about page`)
//})
app.get("/contact",(req,res)=>{
    res.send(`hello contact`)
})
app.get("/signin",(req,res)=>{
    res.send(`hello in signin page`)
})
app.get("/signup",(req,res)=>{
    res.send(`hello in singup`)
})

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT} port no.`)
})

