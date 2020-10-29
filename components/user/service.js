const {User} = require('./model.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";

exports.generateToken = (user)=>{
    let newUser = {
        name: user.name,
        _id: user._id
    }
    return token = jwt.sign(newUser, claveToken, {expiresIn: 60 * 60 * 24})
}

exports.getUserById = async (userId) =>{
    return await User.findOne({_id: userId});
} 

exports.getUsers = async (queryIn) =>{
    //let usuarios = await Promise.all(um.users.find({}));
    let query = {};
    if(queryIn.name) query.name = queryIn.name;
    let usuarios = await User.find(query);
    return usuarios;
} 

exports.deleteUserByName = async(userName) =>{
    return await User.deleteOne({name: userName});
}

exports.decodeToken = (token) =>{
    console.log("decodeToken");
    try {
        return jwt.verify(token, claveToken); // no hace falta generarlo. Lo hace dentro de
    } catch(e) {
        return null;
    }
}

exports.login = async (name, password) =>{
    console.log("entra al login");
    let usrLoginString = (await getUserByName(name))[0];
    if(usrLoginString !== undefined){
        if(usrLoginString.pass === password){
            console.log("Correct user and token. LOOGED");
            return true;
        } else{
            console.log("Wrong user or password ");
            return false;
        }
    }
}

exports.addUser = async (userName, userPassword, userRole) =>{
    //if(currentUser.role === "admin" && getUserByName(userName) === undefined ){ hacer localstorage
    let newUser = {name: userName, pass: userPassword, role: userRole}
    const user = new User(newUser);
    await user.save();
    return true;
};