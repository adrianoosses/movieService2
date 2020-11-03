const {Order} = require('./model.js');

exports.getOrder = async (req, res) =>{
    let query = {};
    if(req.body.movieId) query.movieId = req.body.movieId;
    let orders = await Order.find(query);
    res.json({'orders':orders});
} 

let getOrderByUserId = async (id) =>{
    let orders = await Order.find({userId: id});
    return orders;
}

exports.addOrder = async (req, res) =>{
    let dateRent = new Date();
    let daysToRent = 7;
    let dateRefund = new Date(dateRent);
    dateRefund.setDate(dateRent.getDate() + daysToRent);
    if((await getOrderByUserId(req.body.userId)).length === 0){
        let newOrder = new Order({
            userId: req.body.userId, 
            movieId: req.body.movieId, 
            createdAt: dateRent, 
            refundDate: dateRefund
        });

        await newOrder.save();
        res.json({"msg":"Added"})
        return true;
    }else{
        res.json({"msg":"Not added"})
        return false;
    }
} 