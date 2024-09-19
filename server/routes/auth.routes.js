const express = require('express');
const Authrouter = express.Router();

const {login,register, changePassword} = require('../controllers/uath.controllers.js');
const authMiddleware = require('../middlewears/authMiddlewear.js');

Authrouter.get("/",(req,res)=>{
    res.send("funciona")
})

Authrouter.post("/login",login)

Authrouter.post("/register",authMiddleware,register)
Authrouter.post("/update",changePassword)

module.exports = Authrouter