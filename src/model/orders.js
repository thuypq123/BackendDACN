const moongose = require('mongoose');
const Schema = moongose.Schema;
const objectId = Schema.Types.ObjectId;

const orderSchema = new Schema({
    id: objectId,
    customer_id: String,
    total: Number,
    status: Boolean,
    saved: Boolean,
    shipping_address: String,
    order_email: String,
    order_phone: String,
    receiver_name: String,
    order_date: Date,
    createAt: Date,
})
exports.order = moongose.model('order', orderSchema);