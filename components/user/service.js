const {User} = require('./model.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";

exports.generateToken = (user)=>{
    let newUser = {
        email: user.email
    }
    console.log("email: " + newUser.email);
    return token = jwt.sign(newUser, claveToken, {expiresIn: 60 * 60 * 24})
}

exports.getUserById = async (userId) =>{
    return await User.findOne({_id: userId});
} 
let getUsersByBody = async (req, res) =>{
    let query = {};
    let users = null;
    if(!!req.body.email) query.email = req.body.email;
    if(query.email !== undefined){
        users = await User.findOne(query);
    }
    return users;
};

let getUsersBy = async (req, res) =>{
    let query = {};
    if(!!req.query.name) query.name = req.query.name;
    if(!!req.params._id) query._id = req.params._id;
    let users = await User.find(query);
    return users;
};

exports.getUserByEmail = async (req, res) =>{
    let query = {};
    if(!!req.query.email) query.email = req.query.email;
    let user = await User.findOne(query);
    return user;
};

exports.getUsers = async (req, res) =>{
    let users = await getUsersBy(req, res);
    res.json(users);
    return users;
};

exports.deleteUserByName = async (req, res) =>{
    let id = req.params.id; // body
    await User.deleteOne({_id: id});
    res.json({"msg": id + "eliminado"});
}

exports.decodeToken = (token) =>{
    try {
        return jwt.verify(token, claveToken);
    } catch(e) {
        return null;
    }
}

exports.addUser = async (req, res) =>{
    let msg = "User added.";
    let newUser = {name: req.body.name, pass: req.body.password, email:req.body.email, role: req.body.role}
    const user = new User(newUser);
    await user.save();
    res.json({"message":msg}); 
    return true;
};

exports.login = async(req, res) =>{
    let password = req.body.password;
    let usrLoginString = await getUsersByBody(req, res);
    let resul = false;
    let msg = "";
    if(usrLoginString !== undefined && usrLoginString !== null){
        if(usrLoginString.pass === password){
            console.log("Correct user and token. LOOGED");
            msg = "Logged";
            resul = true;
        } else{
            console.log("Wrong user or password ");
            msg = "Not logged";
            resul = false;
        }
    }else{
        msg = "ERROR";
    }
    res.json({"msg":msg});
    return resul;
};

exports.changeUser = async(req, res) =>{
    let awaitObj = (await getUsersBy(req, res))[0];
    awaitObj.name = req.body.name;
    awaitObj.save();
    res.json({"msg":awaitObj.name + " changed"})
};