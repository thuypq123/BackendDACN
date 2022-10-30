const jwt = require('jsonwebtoken');
const env = require('dotenv');
const {order} = require('../model/orders');
const {orderDetail} = require('../model/orderDetail');
const {product} = require('../model/product');
const {customer} = require('../model/customer');

exports.postOrderCustomer = async (req, res) => {
    const {token} = req.body;
    const customer_id = jwt.verify(token, process.env.SECRET).id;
    const customerOrder = await order.find({customer_id: customer_id, saved: false});
    if(customerOrder.length > 0){
        const customerOrderDetail = await orderDetail.find({order_id: customerOrder[0]._id});
        const arrProductId = customerOrderDetail.map(item => item.product_id);
        const arrProduct = await product.find({_id: {$in: arrProductId}}).lean();
        arrProduct.forEach(item => {
            customerOrderDetail.forEach(item2 => {
                if(item._id == item2.product_id){
                    item.quantity = item2.quantity;
                }
            })
        })
        res.json(arrProduct);
    }else{
        res.json([]);
    }
};

exports.postEditCard = async (req, res) => {
    console.log(req.body);
    const {token, product_id, quantity} = req.body;
    console.log(token, product_id, quantity);
    const customer_id = jwt.verify(token, process.env.SECRET).id;
    const customerOrder = await order.find({customer_id: customer_id, saved: false});
    if(customerOrder.length > 0){
        const customerOrderDetail = await orderDetail.findOneAndUpdate({order_id: customerOrder[0]._id, product_id: product_id}, {quantity: quantity}).lean();
        res.json({...customerOrderDetail, status: true});
    }else{
        res.json([]);
    }
};

exports.postDeleteCard = async (req, res) => {
    const {token, product_id} = req.body;
    const customer_id = jwt.verify(token, process.env.SECRET).id;
    const customerOrder = await order.find({customer_id: customer_id, saved: false});
    if(customerOrder.length > 0){
        const customerOrderDetail = await orderDetail.findOneAndDelete({order_id: customerOrder[0]._id, product_id: product_id}).lean();
        res.json({...customerOrderDetail, status: true});
    }else{
        res.json([]);
    }
};