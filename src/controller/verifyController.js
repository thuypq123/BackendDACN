const Cryptr = require('cryptr');
const env = require('dotenv');
const cryptr = new Cryptr(process.env.VERIFY);
const mongoose = require('mongoose');
const {customer} = require('../model/customer');



exports.getVerify = async (req, res) => {
    const {token} = req.query;
    try{
        const decryptedString = cryptr.decrypt(token);
        const exitsCustomer = await customer.findOne({_id: decryptedString});
        if(exitsCustomer){
            exitsCustomer.verify = true;
            await exitsCustomer.save();
            res.json({status: 'access'});
        }else{
            res.json({status: 'error'});
        }
    }catch(e){
        console.log(e);
        res.json({status: 'error'});
    }
};