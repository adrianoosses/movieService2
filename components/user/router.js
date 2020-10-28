const express = require('express');
const app = express();
const router = express.Router();

const um = require('./model.js');
const us = require('./service.js');
const User = um.User;

const mongoose = require('mongoose');


const auth = (req, res, next) => {
    name = req.body.name;
    console.log("TOKEN auth: " + us.generateToken(name));
    const token = req.headers.authorization;
    //console.log("token"+token);
    if(!token) return res.json({error:"error"});
    else if(us.decodeToken(token)) next();
    else console.log("ERROR");
}

router.get('/login', auth, async (req, res) =>{
    let name = req.body.name;
    let usr = await us.getUserByName(name);
    console.log("TOKEN 2: " + us.generateToken(usr.name));
    password = req.body.password
    if(us.login(name, password)?res.send("Logged"):res.send("Not logeed"));
});



router.post('/', (req, res) =>{
    let msg = (us.addUser(req.body.name, req.body.password, req.body.role))?"User added.":"denied";
    res.json({"message":msg}); 
});

// Endpoint de Perfil (R)read -> GET
router.get('/', async (req, res) =>{
    let users = await us.getUsers();
    res.json(users); 
});

router.put('/', async (req, res) => {
    console.log
    let oldName = req.query.name;
    console.log(oldName);
    let awaitObj = await us.getUserByName(oldName);
    awaitObj.name = "Adriano2";
    awaitObj.save();
    res.json({"msg":awaitObj.name}); 
});

// Endpoint de Baja de usuario (D) -> DELETE
router.delete('/', auth, (req, res) =>{
    let name = req.body.name;
    let msg =  name + " eliminado";
    (us.deleteUserByName(name))? res.json({"msg" : msg}) : res.status(401); // Unauthorized 
});

exports.routes = router;
