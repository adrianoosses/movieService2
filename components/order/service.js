const {Order} = require('./model.js');

let getOrderByUserId = async (id) =>{
    let orders = await Order.find({userId: id});
    return orders;
} 

exports.addOrder = async (queryIn) =>{
    let dateRent = new Date();
    let daysToRent = 7;
    let dateRefund = new Date(dateRent);
    dateRefund.setDate(dateRent.getDate() + daysToRent);

    if((await getOrderByUserId(queryIn.userId)).length === 0){
        let newOrder = new Order({
            userId: queryIn.userId, 
            movieId: queryIn.movieId, 
            createdAt: dateRent, 
            refundDate: dateRefund
        });

        await newOrder.save();
        return true;
    }else return false;
}

exports.getOrder = async (queryIn) =>{
    let query = {};
    if(queryIn.movieId) query.movieId = queryIn.movieId;
    let orders = await Order.find(query);
    return orders;
} 