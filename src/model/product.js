const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const productSchema = new Schema({
    id: ObjectId,
    name: String,
    price: Number,
    img: String,
    des: String,
    categoryId: String,
    createAt: Date,
    stock: Number,
});

exports.product = mongoose.model('product', productSchema);