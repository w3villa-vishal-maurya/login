const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");    
const verifyJwt = require('../middleware/verifyJwt');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


const authController = {};

authController.signUp = async (req, res) => {
    try {
        const username = req.body.username;
        console.log(req.body);
        const user = await User.findOne({ username })
        
        if (user) {
            return res.send("User is already registered!");
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        })
        
        const savedUser = await newUser.save();
        const token = jwt.sign({ _id: savedUser._id }, "access");
        localStorage.setItem(`${newUser.username}`, token);
        console.log(localStorage.getItem(`${newUser.username}`));
        res.redirect("/");
    }
    catch (e) {
        res.status(500).send(e);
    }
}

authController.login = async (req, res) => {
    try {
        const username = req.body.username;
        const verify = await verifyJwt(username);
        console.log(verify);
        if(!verify){
            return res.status(401).json({message: 'Unauthorized'})
        }
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).Json({ message: "User not registered!" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).Json({ message: "Invaliid email or password" });
        }
        res.redirect("/user/chat");
    }
    catch(e){
        res.status(500).json(e);
    }
}

authController.getAllUsers = async (req, res) => {
    res.status(200).send("Hello you are User!!!");
}

module.exports = authController