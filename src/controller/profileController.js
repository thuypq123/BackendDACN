const {customer} = require('../model/customer');
const {order} = require('../model/orders');
const {orderDetail} = require('../model/orderDetail');
const {product} = require('../model/product');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.getProfile = async (req, res) => {
    try {
        const {token} = req.body;
        const customer_id = jwt.verify(token, process.env.SECRET).id;
        const customerInfo = await customer.findById(customer_id).lean();
        delete customerInfo.password;
        res.json(customerInfo);
    } catch (error) {
        res.json({status: false, message: 'Token is not valid'});
    }
};
exports.postEditProfile = async (req, res) => {
    // obj have fullname, phone, address, avatar, email
    const {token, fullname, phone, address, email} = req.body;
    try {
        const exitsCustomer = await customer.findOne({email: email});
        if(exitsCustomer){
            res.json({status: false, message: 'Email đã tồn tại'});
        }else{
            const customer_id = jwt.verify(token, process.env.SECRET).id;
            const exitsCustomer = await customer.findById(customer_id);
            exitsCustomer.fullname = fullname;
            exitsCustomer.phone = phone;
            exitsCustomer.address = address;
            exitsCustomer.email = email;
            const customerUpdate = await exitsCustomer.save();
            console.log(customerUpdate);
            res.json({status: true, message: 'Cập nhật thành công', profile: customerUpdate});
        }
    }catch(error) {
        res.json({status: false, message: 'Token is not valid'});
    };
};

exports.getOrdersProfile = async (req, res) => {
    const toke = req.body.token;
    const customer_id = jwt.verify(toke, process.env.SECRET).id;
    let orders = await order.find({customer_id: customer_id, saved:'true'}).lean();
    await Promise.all(orders.map(async order => {
        const getDetails = await orderDetail.find({order_id: order._id}).lean();
        const orderProduct = await Promise.all(getDetails.map(async detail => {
            const getProduct = await product.findById(detail.product_id).lean();
            getProduct.quantity = detail.quantity;
            getProduct.price = detail.price;
            order.total = order.total;
            return getProduct;
        }));
        order.products = orderProduct;
    }));
    res.json(orders);
};