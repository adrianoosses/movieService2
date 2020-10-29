const mongoose = require('mongoose');
const um = require('./model.js');
const Movie = um.Movie;

let moviesArray = [
    {title:"The Godfather", genre:"drama", actors:["Marlon Brando", "Al Pacino"], duration:"120m"},
    {title:"12 Angry Men", genre:"drama", actors:["Henry Fonda"], duration:"120m"},
    {title:"The Schindler List", genre:"drama", actors:["Liam Neeson"], duration:"120m"},
    {title:"Scarface", genre:"drama", actors:["Al Pacino"], duration:"120m"}
];

let moviesArrayObj = (mArr) =>{
    let arr = [];
    for(let i = 0; i < mArr.length; i++) arr.push(new Movie(mArr[i]));
    return arr;
} 

let loadMovies = async (arr) =>{
    for(let i = 0; i < arr.length; i ++) await arr[i].save();
}

exports.loadMovies2 = async () =>{
    await loadMovies(moviesArrayObj(moviesArray)).then();
}



