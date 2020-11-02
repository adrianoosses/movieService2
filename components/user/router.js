const express = require('express');
const app = express();
const router = express.Router();

const {User} = require('./model.js');
const {auth} = require('./middlewares.js');
const {login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');

const mongoose = require('mongoose');

//#DUDA: check auth router.get('/login', auth, async (req, res, NEXT??) =>{
router.get('/login', auth, login);

router.post('/', addUser);

// Endpoint de Perfil (R)read -> GET
router.get('/', getUsers);

router.put('/', changeUser);

// Endpoint de Baja de usuario (D) -> DELETE
router.delete('/:id', auth, deleteUserByName);

exports.routes = router;