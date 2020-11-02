const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mm = require('./model.js');
const ms = require('./service.js');

// GESTION DE PELICULAS

// Endpoint busqueda titulo, genero, actores, director, duracion
router.get('/', ms.getMovies);

router.post('/', ms.addMovie);

exports.routes = router;