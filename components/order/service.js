const {Order} = require('./model.js');

let getOrderByUserId = async (id) =>{
    let orders = await Order.find({userId: id});
    return orders;
} 

exports.addOrder = async (res, req) =>{
    //console.log("addd ");
    let dateRent = new Date();
    let daysToRent = 7;
    let dateRefund = new Date(dateRent);
    dateRefund.setDate(dateRent.getDate() + daysToRent);
    console.log("req.body.userId "+ req.body);
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

exports.getOrder = async (queryIn) =>{
    let query = {};
    if(queryIn.movieId) query.movieId = queryIn.movieId;
    let orders = await Order.find(query);
    return orders;
} 