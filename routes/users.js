const express = require('express');
const app = express();
const router = express.Router();
let jwt = require('jsonwebtoken');

// https://www.npmjs.com/package/jsonwebtoken
//var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
/*jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
    console.log(token);
  });
*/

/*
module.exports.generateToken = (data, expiresIn = CONF.JWT.SESSION_TIME * 60 * 60) => (
jwt.sign(data, CONF.JWT.SECRET, {expiresIn})
*/
/*
jwt.sign({
  data: 'foobar'
}, 'secret', { expiresIn: 60 * 60 });
*/
/* sign(payload: string | object | Buffer, secretOrPrivateKey: Secret, options?: SignOptions): string */
/*Synchronously sign the given payload into a JSON Web Token string payload - Payload to sign, could be an literal, 
buffer or string secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for
 RSA and ECDSA. [options] - Options for the signature returns - The JSON Web Token string */ 
//jwt.sign()
//let token = jwt.sign({foo: 'bar'}, privateKey, { algorithm: 'RS256'});

//verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions): string | object
/* Synchronously verify given token using a secret or a public key to get a decoded token token - 
JWT string to verify secretOrPublicKey - Either the secret for HMAC algorithms, or the PEM
 encoded public key for RSA and ECDSA. [options] - Options for the verification returns - The decoded token.*/
/*
 // verify a token symmetric - synchronous
var decoded = jwt.verify(token, 'shhhhh');
console.log(decoded.foo) // bar
*/
//let decoded = jwt.verify()

// https://www.oscarblancarteblog.com/2017/06/08/autenticacion-con-json-web-tokens/

// GESTION DE USUARIO

class User{
    constructor(name, pass, role){
        this.id = null;
        this.name = name;
        this.pass = pass;
        this.role = role;
        this.order = null;
    }
}

let currentUser = null;
let adriano = new User("adriano", "123456", "admin");
setUserId(adriano);
let adrianoString = JSON.stringify(adriano);
let adrianoParse = JSON.parse(adrianoString);
let usersArray = []
usersArray.push(adrianoParse);

let generateToken = (userName, userPassword, userRole)=>{
    let newUser = {
        name: userName,
        role: userRole,
        order: null
    }
    return token = jwt.sign(newUser, userPassword, {expiresIn: 60 * 60 * 24})
}


let addUser = (userName, userPassword, userRole) =>{
    console.log(generateToken(userName, userPassword, userRole));
    if(currentUser.role === "admin" && getUserByName(userName) === undefined ){
        let newUser = new User(userName, userPassword, userRole);
        if(setUserId(newUser) === true){
            usersArray.push(newUser);
            return true;
        } else return false;
    } else return false;
};


router.post('/addUser', (req, res) =>{
    let msg = (addUser(req.body.name, req.body.password, req.body.role))?"User added.":"denied";
    res.json({"message":msg}); 
});

let getUsers = () => {
    return usersArray;
}

// Endpoint de Perfil (R)read -> GET
router.get('/getUsers', (req, res) =>{
    let users = getUsers();
    res.json(users); 
});

let getUserByName = (nameUser) =>{
    user = usersArray.find((item) => item.name === nameUser);
    return user;
}

let getUserById = (userId) =>{
    user = usersArray.find((item) => item.id === userId);
    return user;
}

function idExists(id){
    /*let res = getUserById(id) === undefined ? false: true;
    return res; */
    return !!getUserById(id);
}
function setUserId(user){
    let idGenerate = 0;
    do idGenerate = Math.floor(Math.random()*200);
    while(idExists===true);
    user.id =idGenerate;
    console.log("user id:" + user.id);
    return true;
}

// Como lo paso por postman? dice q se genera automaticamente. como?
// hay que quitar el bearer? lo pone en la pag de la compañera
// la contraseña cual es? la del usuario? como verifico q usuario quiere hacer determinada accion? el logeado (current user)?
/*
router.use('/sec', (req, res, next) =>{
    let token = req.headers.authorization;
    token = token.replace('Bearer ', '');
    // hacer try catch
    jwt.verify(token, '123456', function(err, token){
        if(err){
            return -1;
        } else {
            req.token = token;
            next();
        }
    })
}*/


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
    if(deleteUser(name)) res.json({"msg" : msg});
    else res.send("Unauthorized"); 
});

let login = (name, password) =>{
    let usrLoginString = JSON.stringify(getUserByName(name));
    if(usrLoginString !== undefined){
        let usrLogin = JSON.parse(usrLoginString);
        if(usrLogin.pass === password){
            currentUser = usrLogin;
            exports.cu = currentUser;
            return true;
        }else{
            console.log("Wrong user or password ");
            return false;
        }
    }
    
}

router.get('/login', (req, res) =>{
    name = req.body.name;
    password = req.body.password
    if(login(name, password)){
        res.send("Logged");
    }else{
        res.send("Not logeed");
    } 
});
exports.getUserById = getUserById;
exports.routes = router;
