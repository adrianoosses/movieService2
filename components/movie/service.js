const um = require('./model.js');
const Movie = um.Movie;

exports.getMovies = async (queryIn) =>{
    const query = {};
    //console.log("queryIn.title "+ queryIn.title);
    if(queryIn.title) query.title = queryIn.title;
    if(queryIn.director) query.director = queryIn.director;
    if(queryIn.duration) query.duration =queryIn.duration;
    if(queryIn.genre) query.genre = queryIn.genre;
    return await Movie.find(query);
}

let movieExistsByTitle= async (titleIn) =>{
    let movies = await Movie.findOne({title: titleIn});
    return !!movies;
}

//let addMovie = async (movieTitle, movieDirector, movieActors, movieGenre, movieDuration) =>{
exports.addMovie = async (queryIn) =>{
    if(!(await movieExistsByTitle(queryIn.title))){
        console.log("movie is not yet");
        let newMovie = {title: queryIn.title, 
            director: queryIn.director, 
            actors: queryIn.actors, 
            genre: queryIn.genre, 
            duration: queryIn.duration};
        const movie = new Movie(newMovie);
        await movie.save();
        return true
    }else{
        console.log("movie is in");
        return false;
    }
};


// Endpoint busqueda id 
exports.getMovieById = (id) =>{
    let movie = Movie.findOne({_id: id});
    return movie;
}