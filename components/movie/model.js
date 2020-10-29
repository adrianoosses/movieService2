const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.Movie = mongoose.model('Movie', new Schema({
    title:{type: String},
    genre:{type: String},
    director:{type: String},
    actors:{type: Array},
    duration:{type: String}
}));
