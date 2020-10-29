const mongoose = require('mongoose');
const um = require('./model.js');
const Movie = um.Movie;
/*
let moviesArray = [
    {name:"The Godfather", genre:"drama", actors:["Marlon Brando", "Al Pacino"]},
    {name:"12 Angry Men", genre:"drama", actors:["Henry Fonda"]},
    {name:"The Schindler List", genre:"drama", actors:["Liam Neeson"]},
    {name:"Scarface", genre:"drama", actors:["Al Pacino"]}
];

let moviesArrayObj = (moviesArr) =>{
    let arr = [];
    for(let i = 0; i < moviesArr.length; i++) arr.push(new Movie(movieArr[i]));
} 

let loadMovies = async (arr) =>{
    for(let i = 0; i < arr.length; i ++) await arr[i].save();
}
exports.loadMovies2 = () =>{
    loadMovies(moviesArrayObj(moviesArray)).then();
}
*/


