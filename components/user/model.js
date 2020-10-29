const mongoose = require('mongoose');
const Schema = mongoose.Schema;


exports.User = mongoose.model('User', new Schema({
    name:{type: String},
    pass:{type: String},
    role:{type: String},
}));

//exports.pelicula = {name: "The Goodfather", id:"1", genre:"drama", actors:"Marlon Brando"};
