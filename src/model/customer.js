const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const customer = new Schema({
    id: ObjectId,
    fullname: String,
    avatar: String,
    email: String,
    password: String,
    created_at: Date,
    phone: String,
    address: String,
    status: Boolean,
    created_at: Date,
});
exports.customer = mongoose.model('customer', customer);