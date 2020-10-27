const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// GESTION DE PELICULAS

class Movie{
    constructor(title, id, genre, actors){
        this.title = title;
        this.id = id;
        this.genre = genre;
        this.actors = actors;
    }
}
exports.pelicula = {name: "The Goodfather", id:"1", genre:"drama", actors:"Marlon Brando"};
let moviesArray = [];
moviesArray.push(new Movie("The Godfather", "1", "drama", ["Marlon Brando", "Al Pacino"]));
moviesArray.push(new Movie("12 Angry Men", "2", "drama", ["Henry Fonda"]));
moviesArray.push(new Movie("The Schindler List", "3", "drama", ["Liam Neeson"]));
moviesArray.push(new Movie("Scarface", "4", "drama", ["Al Pacino"]));


// Endpoint busqueda titulo -> GET a MongoDB?
function getMovieByTitle(title){
    return moviesArray.find((item) => item.title === title);
}

router.get('/getMovieByTitle', (req, res) =>{
    let title = req.body.title;
    let moviesByTitle = getMovieByTitle(title)
    res.send(moviesByTitle); 
});

function addMovie(){
    return moviesArray.find((item) => item.title === title);
}

router.post('/addMovie', (req, res) =>{
    let title = req.body.title;
    let moviesByTitle = getMovieByTitle(title)
    res.send(moviesByTitle); 
});

// Endpoint busqueda id -> GET a MongoDB?
function getMovieById(id){
    let movie = moviesArray.find((item) => item.id === id);
    return movie;
}

router.get('/getMovieById', (req, res) =>{
    let id = req.body.id;
    let moviesById = getMovieById(id);
    res.send(moviesById); 
});

function getMovieByGenre(genre){
    let movies = moviesArray.filter((item) => item.genre === genre);
    return movies;
}

router.get('/getMovieByGenre', (req, res) =>{
    let genre = req.body.genre;
    let moviesByGenre = getMovieByGenre(genre);
    res.send(moviesByGenre); 
});

function getMovieByActor(actor){
    let movies = moviesArray.filter((itemMovie) => itemMovie.actors.find((item) => item === actor));
    return movies;
}


router.get('/getMovieByActor', (req, res) =>{
    let actor = req.body.actor;
    let moviesByActor = getMovieByActor(actor);
    res.send(moviesByActor); 
});


// Endpoint busqueda todas -> GET a MongoDB?
function getMovies(){
    let arr = [];
    for(let i = 0; i < moviesArray.length; i++){
        arr.push(moviesArray[i].title);
    }
    return arr;
}

router.get('/getMovies', (req, res) =>{
    let movies = getMovies();
    res.send(movies); 
});

exports.routes = router;