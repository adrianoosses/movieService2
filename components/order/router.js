const express = require('express');
const app = express();
const router = express.Router();

const {addOrder, getOrder} = require('./service.js');
const mongoose = require('mongoose');

//ORDER MANAGEMENT

router.post('/', (req, res) =>{
    if(addOrder(req.body)) msg="Order added";
    else msg="Not added"
    res.json({"msg":msg})
})

router.get('/', async (req, res) =>{
    let orders = await getOrder(req.body);
    res.json({'orders':orders});
} )

exports.routes = router;