const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { hashPassword, comparepassword, comparePassword } = require('../helpers/auth');
const test = (req, res) => {
    res.json('test is working')
}


//Signup Endpoint
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        //Check if name was entered
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        };
        //Check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password must be 6 or more characters'
            });
        }
        //Check Email
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({
                error: 'Email is taken Already'
            })
        }


        const hashedPassword = await hashPassword(password);

        //Create user in Database
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        return res.json(user)


    } catch (error) {
        console.log(error);
    }
}


//Signin Endpoint

const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Check if User Exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user Found'
            })
        }
        //    check if password match 
        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET , {},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(user)
            })
        }
        else {
            res.json({ error: 'Password does not match' })
        }
    }
    catch (error) {
        console.log(error);
    }
}


const getProfile= (req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        res.json(null)
    }
}

module.exports = {
    test,
    signupUser,
    signinUser,
    getProfile
}