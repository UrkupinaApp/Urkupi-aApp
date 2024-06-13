const express = require('express');
const Authrouter = express.Router();

const {login,register} = require('../controllers/uath.controllers.js')

Authrouter.get("/",(req,res)=>{
    res.send("funciona")
})

Authrouter.post("/login",login)

Authrouter.post("/register",register)

module.exports = Authrouter