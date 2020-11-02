const {User} = require('./model.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";

exports.generateToken = (user)=>{
    let newUser = {
        name: user.name,
    }
    console.log("name: " + newUser.name);
    return token = jwt.sign(newUser, claveToken, {expiresIn: 60 * 60 * 24})
}

exports.getUserById = async (userId) =>{
    return await User.findOne({_id: userId});
} 

let getUsersBy = async (req, res) =>{
    //let usuarios = await Promise.all(um.users.find({}));
    let query = {};
    if(!!req.query.name) query.name = req.query.name;
    if(!!req.params._id) query._id = req.params._id;
    let users = await User.find(query);
    return users;
};

exports.getUsers = async (req, res) =>{
    let users = await getUsersBy(req, res);
    res.json(users);
    return users;
};

exports.deleteUserByName = async (req, res) =>{
    let id = req.params.id; // body
    //console.log("id " + id);
    //(us.deleteUserByName(name))? res.json({"msg" : msg}) : res.status(401); // Unauthorized 
    await User.deleteOne({_id: id});
    res.json({"msg": id + "eliminado"});
}

exports.decodeToken = (token) =>{
    console.log("decodeToken");
    try {
        console.log("TOKEN 2: " + token);
        return jwt.verify(token, claveToken);
    } catch(e) {
        return null;
    }
}

exports.addUser = async (req, res) =>{
    let msg = "User added.";
    let newUser = {name: req.body.name, pass: req.body.password, role: req.body.role}
    const user = new User(newUser);
    await user.save();
    res.json({"message":msg}); 
    return true;
};

exports.login = async(req, res) =>{
    console.log("entra al login");
    password = req.body.password
    let usrLoginString = (await getUsersBy(req, res))[0];
    let resul = false;
    let msg = "";
    if(usrLoginString !== undefined){
        if(usrLoginString.pass === password){
            console.log("Correct user and token. LOOGED");
            msg = "Logged";
            resul = true;
        } else{
            console.log("Wrong user or password ");
            msg = "Not logged";
            resul = false;
        }
    }
    //let usr = await us.getUser(req.body);
    //console.log("TOKEN 2: " + us.generateToken(usr.name));
    res.json({"msg":msg});
    return resul;
};

exports.changeUser = async(req, res) =>{
    let awaitObj = (await getUsersBy(req, res))[0];
    awaitObj.name = req.body.name;
    awaitObj.save();
    res.json({"msg":awaitObj.name + " changed"})
};