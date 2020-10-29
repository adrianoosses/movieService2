const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mm = require('./model.js');
const ms = require('./service.js');

// GESTION DE PELICULAS

// Endpoint busqueda titulo, genero, actores, director, duracion
router.get('/', async (req, res) =>{
    let movies = await ms.getMovies(req.query);
    res.json(movies); 
});


router.post('/', (req, res) =>{
    let msg = "";
    if(ms.addMovie(req.body)) msg = " added";
    else msg = "exists";
    res.json({"msg": req.body.title + msg});
});

exports.routes = router;