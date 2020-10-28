const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// #DUDA: donde se almacenan los tokens para compararlos? en la coleccion usuarios?

exports.User = mongoose.model('User', new Schema({
    name:{type: String},
    pass:{type: String},
    role:{type: String},
}));

//exports.pelicula = {name: "The Goodfather", id:"1", genre:"drama", actors:"Marlon Brando"};
