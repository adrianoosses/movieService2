const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let usr = require('./components/movie/model.js');

exports.Movie = mongoose.model('Movie', new Schema({
    name:{type: String},
    genre:{type: String},
    actors:{type: Array}
}));
