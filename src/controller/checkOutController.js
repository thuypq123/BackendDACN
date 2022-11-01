const {order} = require('../model/orders');
const {orderDetail} = require('../model/orderDetail');
const {product} = require('../model/product');
const jwt = require('jsonwebtoken');

exports.postInforCheckouts = async (req, res) => {
    const customer_id = jwt.verify(req.body.token, process.env.SECRET).id;
    const orderCustomer = await order.findOne({customer_id: customer_id, saved: false}).lean();
    const orderDetailCustomer = await orderDetail.find({order_id: orderCustomer._id}).lean();
    const productsId  = orderDetailCustomer.map(item => item.product_id);
    const products = await product.find({_id: {$in: productsId}}).lean();
    const totalPrice = orderDetailCustomer.reduce((total, item) => {
        return total + (parseInt(item.price) * item.quantity);
    }, 0);
    const arrProducts = products.map(item => {
        const quantity = orderDetailCustomer.find(item1 => item1.product_id == item._id).quantity;
        return {
            ...item,
            quantity: quantity
        }
    });
    const inforCheckOut = {
        products: arrProducts,
        total: totalPrice
    };
    res.json(inforCheckOut);
};