const {order} = require('../model/orders');
const {orderDetail} = require('../model/orderDetail');
const {product} = require('../model/product');
const jwt = require('jsonwebtoken');

exports.postInforCheckouts = async (req, res) => {
    const customer_id = jwt.verify(req.body.token, process.env.SECRET).id;
    const orderCustomer = await order.findOne({customer_id: customer_id, saved: false});
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
    orderCustomer.total = totalPrice;
    const inforCheckOut = {
        products: arrProducts,
        total: totalPrice
    };
    res.json(inforCheckOut);
};

exports.postCheckoutInfo = async (req, res) => {
    try{
        const customer_id = jwt.verify(req.body.token, process.env.SECRET).id;
        const { fullname, email, phone, address, order_date, receiver, payment, token } = req.body;
        const orderCustomer = await order.findOne({customer_id: customer_id, saved: false});
        orderCustomer.order_email = email;
        orderCustomer.order_phone = phone;
        orderCustomer.shipping_address = address;
        orderCustomer.order_date = order_date;
        orderCustomer.receiver_name = receiver;
        orderCustomer.status == 'MOMO'? true:false;
        orderCustomer.saved = true;
        const test = await orderCustomer.save();
        console.log(test);
        res.json(test);
    }catch{
        res.json({status: 'error'});
    }
};  