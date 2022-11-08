const env = require('dotenv');
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.VERIFY);
const mongoose = require('mongoose');
const {customer} = require('../model/customer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aehole37@gmail.com',
        pass: process.env.PASSWORD,
    },
});

exports.postResetMail = async (req, res) => {
    try{
        const exitsCustomer = await customer.findOne({email: req.body.email});
        if(exitsCustomer){
            const encryptedString = cryptr.encrypt(exitsCustomer._id);
            const html = `<h1>Chào mừng bạn đến với shop</h1>
                <p>Để hoàn tất việc đặt lại mật khẩu, vui lòng nhấn vào nút bên dưới</p>
                <div style="text-align: center;margin:100px"><a style="text-decoration: none;padding:20px;background: black; color: white" href="http://localhost:3000/forgot?token=${encryptedString}">Xác nhận</a></div>`;
            transporter.sendMail({
                from: "Lê Minh Thủy", // sender address
                to: req.body.email, // list of receivers
                subject: "Quên mật khẩu", // Subject line
                text: "Để lấy lại mật khẩu vui lòng nhấn vào button bên dưới", // plain text body
                html: html,
            }).then(info => {
                console.log({info});
                res.json({message: 'Đã gửi mail', status: true});
            }).catch(console.error);
        }else{
            res.json({message: 'Email không tồn tại', status: false});
        }
    }catch(e){
        console.log(e);
        res.json({message: 'Email không tồn tại', status: false});
    };
};