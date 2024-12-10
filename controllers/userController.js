const User = require('../models/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const addUser = async(req, res) => {
    try {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
            if(err){
                res.stats(500).json({error:err})
            }
            var userItem={
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash,
                createdAt: new Date()
            }
            var user = new User(userItem)
            await user.save()
            res.status(201).json(user)
            })
    } catch (error) {
        res.status(500).json({error:error})
    }
}


// login
const login = async(req, res) => {
    // Authentication
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(500).json({message:"User not found"})
        }
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
            return res.status(500).json({message:"Invalid credentials"})
        }
        let payload = {user:email}
        const secretKey = process.env.JWT_SECRET_KEY;
        let token = jwt.sign(payload, secretKey)
        res.status(200).json({message: "Loggin Successful", token:token})
    } catch (error) {
        res.status(500).json({error:error})
    }
}

module.exports = {addUser, login};