const express = require("express");
const route = express.Router();
const verifyJwt = require("../middleware/verifyJwt")
const authController = require("../controller/authController")

route.get("/login", (req, res)=>{
    res.render("login");
})

route.get("/chat", (req, res)=>{
    // res.render("chat");
    res.send("hello for lookong chat");
})

route.post("/login", authController.login);

route.get("/allUser", authController.getAllUsers);

module.exports = route;