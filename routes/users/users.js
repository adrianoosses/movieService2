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

loadUsers().then();

//let getUserByName = (nameUser) => usersArray.find((item) => item.name === nameUser);
let getUserByName = async (userName) => {
    return usr1 = await um.users.find({name: userName});
    //console.log("USUARIOS3: " + usr1);
}

let login = async (name, password) =>{
    let usrLoginString = await getUserByName(name);
    console.log("usrLoginString: "+usrLoginString);
    if(usrLoginString !== undefined){
        let usrLogin = JSON.parse(usrLoginString);
        if(usrLogin.pass === password) return true;
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


/*
let usersArray = []
usersArray.push(adrianoParse);
console.log("usersArray" + usersArray); */
/*
let addUser = async (userName, userPassword, userRole) =>{
    console.log(generateToken(userName, userPassword, userRole));
    //if(currentUser.role === "admin" && getUserByName(userName) === undefined ){ hacer localstorage
    let newUser = {id: null, name: userName, pass: userPassword, role: userRole}
    if(setUserId(newUser) === true){
        //usersArray.push(newUser);
        const user = new usersSchema(newUser);
        await user.save();
        return true;
    } else return false;
    //} else return false;
};


router.post('/addUser', (req, res) =>{
    let msg = (addUser(req.body.name, req.body.password, req.body.role))?"User added.":"denied";
    res.json({"message":msg}); 
});


let generateToken = (userName, userRole)=>{
    let newUser = {
        name: userName,
        role: userRole,
        order: null
    }
    return token = jwt.sign(newUser, claveToken, {expiresIn: 60 * 60 * 24})
}


let getUsers = () => {
    return usersArray;
}

// Endpoint de Perfil (R)read -> GET

router.get('/getUsers', (req, res) =>{
    let users = getUsers();
    res.json(users); 
});



//const getUserById = (userId) => usersArray.find((item) => item.id === userId);
function getUserById(userId){ 
    return usersArray.find((item) => item.id === userId);
}

function idExists(id){ 
    return !!getUserById(id)
}

function setUserId(user){
    let idGenerate = 0;
    do idGenerate = Math.floor(Math.random()*200);
    while(idExists(idGenerate));
    user.id = idGenerate;
    console.log("user id:" + user.id);
    return true;
}
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
