const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// #DUDA: donde se almacenan los tokens para compararlos? en la coleccion usuarios?

exports.users = mongoose.model('Users', new Schema({
    id:{type: String},
    name:{type: String},
    pass:{type: String},
    role:{type: String},
    token:{type: String}
}));

//exports.pelicula = {name: "The Goodfather", id:"1", genre:"drama", actors:"Marlon Brando"};
