const express = require('express');
const app = express();
const router = express.Router();

exports.moviesSchema = mongoose.model('Movies', new Schema({
    name:{type: String},
    id:{type: String},
    genre:{type: String},
    actors:{type: Array}
}));

exports.pelicula = {name: "The Goodfather", id:"1", genre:"drama", actors:"Marlon Brando"};