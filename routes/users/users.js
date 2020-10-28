const express = require('express');
const app = express();
const router = express.Router();
const um = require('./models.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// #TAREA: buscar user por path params

// 1. conectar con mongo. Inicializar users
// 2. login con jwt

//let currentUser = null;
//let adriano = new User("adriano", "123456", "admin");
//let adriano = {id: null, name: 'adriano', pass: '123456', role: 'admin'};
//setUserId(adriano);
/*
let usersSchema = mongoose.model('Users', new Schema({
    name:{type: String},
    id:{type: String},
    genre:{type: String},
    actors:{type: Array}
}));
*/
let loadUsers = async () =>{
    const adrianoObj = {id: null, name: 'adriano', pass: '123456', role: 'admin'};
    //const mortadeloObj = {id: null, name: 'mortadelo', pass: '654321', role: 'client'};
    const adriano = new um.users(adrianoObj);
    await adriano.save();
}
//loadUsers().then();


let generateToken = (userName, userRole)=>{
    let newUser = {
        name: userName,
        role: userRole,
        order: null
    }
    return token = jwt.sign(newUser, claveToken, {expiresIn: 60 * 60 * 24})
}

let getUserByName = async (userName) => usr1 = await um.users.find({name: userName});
let getUserById = async (userId) => usr1 = await um.users.find({id: userId});

let login = async (name, password) =>{
    let usrLoginString = (await getUserByName(name))[0];
    if(usrLoginString !== undefined){
        if(usrLoginString.pass === password) return true;
        else{
            console.log("Wrong user or password ");
            return false;
        }
    }
}

router.get('/login', (req, res) =>{
    name = req.body.name;
    password = req.body.password
    if(login(name, password)?res.send("Logged"):res.send("Not logeed"));
});


async function idExists(id){ 
    return !!(await getUserById(id));
}

function setUserId(user){
    let idGenerate = 0;
    do idGenerate = Math.floor(Math.random()*200);
    while(idExists(idGenerate) === true);
    user.id = idGenerate;
    return true;
}

let addUser = async (userName, userRole) =>{
    let token = generateToken(userName, userRole);
    //if(currentUser.role === "admin" && getUserByName(userName) === undefined ){ hacer localstorage
    let newUser = {id: null, name: userName, pass: userPassword, token, role: userRole}
    if(setUserId(newUser)){
        const user = new um.users(newUser);
        await user.save();
        return true;
    } else return false;
    
    //} else return false;
};

router.post('/addUser', (req, res) =>{
    let msg = (addUser(req.body.name, req.body.password, req.body.role))?"User added.":"denied";
    res.json({"message":msg}); 
});

/*
let usersArray = []
usersArray.push(adrianoParse);
console.log("usersArray" + usersArray); */
/*

let getUsers = () => {
    return usersArray;
}

// Endpoint de Perfil (R)read -> GET

router.get('/getUsers', (req, res) =>{
    let users = getUsers();
    res.json(users); 
});



//const getUserById = (userId) => usersArray.find((item) => item.id === userId);




// midel ware: miro si hay tokens y si lo hay lo pongo en otros servicios q seran los horizontales 

router.use('/sec', (req, res, next) =>{
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '');
    // hacer try catch
    jwt.verify(token, claveToken, function(err, token){
        if(err){
            return -1;
        } else {
            req.token = token;
            next();
        }
    })
})


// Endpoint de Baja de usuario (D) -> DELETE
let deleteUser = (name) => {
    let index = usersArray.findIndex((item) => item.name === name);
    if(currentUser.role === "admin"){
        usersArray.splice(index, 1);
        return true;
    }else return false;
}

router.delete('/unsubscribeUser', (req, res) =>{
    let name = req.body.name;
    let msg =  name + " eliminado";
    (deleteUser(name))? res.json({"msg" : msg}) : res.send("Unauthorized"); 
});



*/
//exports.getUserById = getUserById;
exports.routes = router;
