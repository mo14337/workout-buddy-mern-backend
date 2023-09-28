const express=require('express')
const router=express.Router()
const {userSignup,userLogin}=require("../controllers/userController")

//login route

router.post("/login",userLogin)

//signup route

router.post("/signup",userSignup)


module.exports= router