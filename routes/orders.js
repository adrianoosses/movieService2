const express = require('express');
const app = express();
const router = express.Router();
const usr = require('../routes/users.js');

//GESTION DE PEDIDOS
class Order{
    constructor(userId, movieId, dateRent, dateRefund){
        this.userId = userId;
        this.movie = movieId;
        this.dateRent = dateRent;
        this.dateRefund = dateRefund;
    }
}
let orderArray = [];

let createOrder = (userId, movieId, dateRent, dateRefund) =>{
    let user = usr.getUserById(parseInt(userId));
    console.log("user create order: " + userId);
    console.log("type of order: " + typeof(userId));
    console.log("user: " + user)
    let order = new Order(userId, movieId, dateRent, dateRefund)
    if(user.order === null){
        orderArray.push(order);
        user.order = order;
        return true;
    }else return false;
}

router.post('/addOrder', (req, res) =>{
    let movieId = req.body.movieId;
    let dateRent = new Date();
    let daysToRent = 7;
    let dateRefund = new Date(dateRent);
    dateRefund.setDate(dateRent.getDate() + daysToRent);
    let currentUserCreate = usr.cu;
    if(currentUserCreate !== undefined){
        let userId = (currentUserCreate.role === "admin")? req.body.userId: currentUserCreate.id;
        if(createOrder(userId, movieId, dateRent, dateRefund)) res.send("Order added"); 
        else res.send("The user have an order already."); 
    }else{
        res.send("No user logeed."); 
    }
})

router.get('/getOrders', (req, res) =>{
    console.log(orderArray);
    res.json({'orders':orderArray});
} )

exports.routes = router;