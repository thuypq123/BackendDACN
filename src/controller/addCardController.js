const {order} = require('../model/orders');
const {orderDetail} = require('../model/orderDetail');
const {product} = require('../model/product');
const env = require('dotenv');
const jwt = require('jsonwebtoken');

exports.postAddCard = async (req, res) => {
    const {token, productId} = req.body;
    const customerId = jwt.verify(token, process.env.SECRET).id;
    const orderCustomer = await order.findOne({customer_id: customerId, saved: false});
    const getProduct = await product.findOne({_id: productId});
    console.log(orderCustomer + " " + customerId);
    if(orderCustomer!=null){
        const orderDetailCustomer = await orderDetail.findOne({order_id: orderCustomer._id, product_id: productId});
        if(orderDetailCustomer){
            orderDetailCustomer.product_id = productId;
            orderDetailCustomer.quantity += 1;
            orderDetailCustomer.price = getProduct.price;
            orderDetailCustomer.order_id = orderCustomer._id;
            await orderDetailCustomer.save();
            res.json({message: 'Update success'});
        }else{
            const newOrderDetail = new orderDetail({
                orderId: orderCustomer._id,
                product_id: productId,
                price: getProduct.price,
                order_id: orderCustomer._id,
                quantity: 1,
            });
            await newOrderDetail.save();
            res.json({message: 'Add success'});
        }
    }else{
        const newOrder = new order({
            customer_id: customerId,
            total: 0,
            status: false,
            saved: false,
        });
        await newOrder.save();
        const newOrderDetail = new orderDetail({
            product_id: productId,
            price: getProduct.price,
            order_id: newOrder._id, 
            quantity: 1,
        });
        await newOrderDetail.save();
        res.json({message: 'create success'});
    }
};