const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// #TAREA: listar peliculas
let usr = require('./components/user/router.js');
//let mv = require('./components/movie/router.js');
//let or = require('./routes/orders.js');

let bodyParser = require('body-parser')
app.use(bodyParser.json());

// nombre de la base de datos a la q quieras q se conecte. No hace falta tener la base de datos creada
// en el disco duro
mongoose.connect('mongodb://localhost:27017/db-movieService', {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
})
    .then(() => console.log('Mongoose connected'))
    .catch(e => console.error('Mongoose not connected', e));


//config para q no salga warnings con versiones antiguas
// Modelo: usuarios, peliculas, pedidos
// Controlador: gestion de datos?
// Vista: html css de la pagina ppal

// una por cada entidad


app.use('/user', usr.routes);
//app.use('/movie', mv.routes);
//app.use('/orders', or.routes);


// GESTION DE DATOS
// MongoDB


app.get('/', (req, res) => { res.send(`
    <h1>Hola mundo</h1>`
    )});

app.listen(3000, () => console.log("Sever running"));

