const express = require('express');
const router = express.Router();

const {getOrder, addOrder} = require('./service.js');

//ORDER MANAGEMENT
router.get('/', getOrder);
router.post('/', addOrder);

exports.routes = router;