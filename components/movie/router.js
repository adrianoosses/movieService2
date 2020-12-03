const express = require('express');
const router = express.Router();

const ms = require('./service.js');

// GESTION DE PELICULAS

// Endpoint busqueda titulo, genero, actores, director, duracion
router.get('/', ms.getMovies);

router.post('/', ms.addMovie);




exports.routes = router;