const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new moongose.Schema({
    userId:{type: ObjectId}, //clave foranea, clave de otra tabla q en alli es primaria.
    movieId:{type: ObjectId},
    createdAt: { type: Date, default: Date},
    refundDate: {type: Date}
});

new Order({userId: '489374893748',})