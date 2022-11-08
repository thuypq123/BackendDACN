const {customer} = require('../model/customer');
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
    res.json({status: true});
};