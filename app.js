const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

// #TAREA: listar peliculas
let usr = require('./components/user/router.js');
let mv = require('./components/movie/router.js');
let or = require('./components/order/router.js');

let {getUsers} = require('./components/user/service.js');
let {getMovies} = require('./components/movie/service.js');

let ldUser = require('./components/user/loadData.js');
let ldMovie = require('./components/movie/loadData.js');

let loadData = async () =>{
    let lenUser = (await getUsers({})).length;
    let lenMovie = (await getMovies({})).length;
    if(lenUser === 0) ldUser.loadUsers().then();
    if(lenMovie === 0) ldMovie.loadMovies2().then();
}
loadData();

let bodyParser = require('body-parser')
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/db-movieService', {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
})
    .then(() => console.log('Mongoose connected'))
    .catch(e => console.error('Mongoose not connected', e));

app.use('/user', usr.routes);
app.use('/movie', mv.routes);
app.use('/orders', or.routes);


app.get('/', (req, res) => { 
    res.json({"msg":getMovies});
});

app.listen(3000, () => console.log("Sever running"));

