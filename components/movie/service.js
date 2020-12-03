const um = require('./model.js');
const Movie = um.Movie;

let getMoviesBy = async (req, res) =>{
    const query = {};
    //console.log("queryIn.title "+ queryIn.title);
    if(req.query.title) query.title = queryIn.title;
    if(req.query.director) query.director = queryIn.director;
    if(req.query.duration) query.duration =queryIn.duration;
    if(req.query.genre) query.genre = queryIn.genre;
    return await Movie.find(query);
}

exports.getMovies = async (req, res) =>{
    let movies = await getMoviesBy(req, res);
    res.json(movies); 
}
exports.show2 = () =>{
    console.log("muestra");
}

let movieExistsByTitle= async (titleIn) =>{
    let movies = await Movie.findOne({title: titleIn});
    return !!movies;
}

//let addMovie = async (movieTitle, movieDirector, movieActors, movieGenre, movieDuration) =>{
exports.addMovie = async (req, res) =>{
    let msg = "";

    if(!(await movieExistsByTitle(req.body.title))){
        console.log("movie is not yet");
        let newMovie = {title: req.body.title, 
            director: req.body.director, 
            actors: req.body.actors, 
            genre: req.body.genre, 
            duration: req.body.duration};
        const movie = new Movie(newMovie);
        await movie.save();
        res.json({"msg": "added"})
    }else{
        console.log("movie is in");
        res.json({"msg": "Not added"})
    }
};


// Endpoint busqueda id 
exports.getMovieById = (id) =>{
    let movie = Movie.findOne({_id: id});
    return movie;
}