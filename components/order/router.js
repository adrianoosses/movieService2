const express = require('express');
const app = express();
const router = express.Router();

const {addOrder, getOrder} = require('./service.js');
const mongoose = require('mongoose');

//ORDER MANAGEMENT

router.post('/', addOrder);

router.get('/', async (req, res) =>{
    let orders = await getOrder(req.body);
    res.json({'orders':orders});
} )

exports.routes = router;