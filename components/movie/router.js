const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mm = require('./model.js');
const ms = require('./service.js');
const Movie = mm.Movie;

// GESTION DE PELICULAS
/*
class Movie{
    constructor(title, id, genre, actors){
        this.title = title;
        this.id = id;
        this.genre = genre;
        this.actors = actors;
    }
}
*/

// Endpoint busqueda titulo -> GET a MongoDB?

let getMovieByTitle = async (movieTitle) =>{
    let objBuscado = Movie.findOne({title: movieTitle});
    return objBuscado;
} 
/*
router.get('/:title', async (req, res) =>{
    let title = req.params.title;
    console.log(title);
    console.log("await getMovieByTitle(title)"+await getMovieByTitle(title));
    console.log("getMovieByTitle(title)"+getMovieByTitle(title));
    let movieByTitle = await getMovieByTitle(title);
    res.json(movieByTitle); 
});
*/

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

router.get('/', async (req, res) =>{
    const query = {};
    if(req.query.title) query.title = req.query.title;
    if(req.query.director) query.director = req.query.director;
    if(req.query.duration) query.duration = req.query.duration;
    if(req.query.genre) query.genre = req.query.genre;
    console.log("query"+ query);
    const data = await Movie.find(query);
    //const data = await Movie.find({});
    res.json(data); 
});

exports.routes = router;