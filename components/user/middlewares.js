const us = require('./service.js');

exports.auth = (req, res, next) => {
    console.log("TOKEN auth: " + us.generateToken(req.body));
    const token = req.headers.authorization;
    //console.log("token"+token);
    if(!token) return res.json({error:"Error: token doesn't exist"});
    else if(us.decodeToken(token)){ 
        console.log("us.decodeToken(token) "+us.decodeToken(token));
        next();
    }
    else console.log("ERROR");
}