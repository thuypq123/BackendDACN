const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const oderDetailSchema = new Schema({
    id: objectId,
    order_id: String,
    product_id: String,
    quantity: Number,
    price: Number,
    createAt: Date,
});

exports.orderDetail = mongoose.model('orderDetail', oderDetailSchema);