const {customer} = require('../model/customer');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const nodemailer = require('nodemailer');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.VERIFY);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aehole37@gmail.com',
      pass: process.env.PASSWORD,
    },
  });
  
exports.postLogin = async (req, res) => {
    const exitsCustomer = await customer.findOne({email: req.body.email});
    if(exitsCustomer){
        if(exitsCustomer.password === req.body.password){
            const token = jwt.sign({id: exitsCustomer._id}, process.env.SECRET);
            res.json({token:token, status: true});
        }else{
            res.json({message: 'Sai mật khẩu', status: false});
        }
    }else{
        res.json({message: 'Email không tồn tại', status: false});
    }
};

exports.postRegister = async (req, res) => {
    const exitsCustomer = await customer.findOne({email: req.body.email});
    if(exitsCustomer){
        res.json({message: 'Email đã tồn tại', status: false}); 
        console.log(req.body);

    }else{
        const newCustomer = await customer.create({
        fullname: req.body.username,
        avatar: "http://loremflickr.com/640/480/nightlife",
        email: req.body.email,
        password: req.body.password,    
        phone: '',
        address: '',
        verify: false,
        status: false,
        created_at: Date.now(),
        });
        const encryptedString = cryptr.encrypt(newCustomer._id);
        const html = `<h1>Chào mừng bạn đến với shop</h1>
        <p>Để hoàn tất việc đăng ký, vui lòng nhấn vào nút bên dưới</p>
        <div style="text-align: center;margin:100px"><a style="text-decoration: none;padding:20px;background: black; color: white" href="http://localhost:3000/verify?token=${encryptedString}">Xác nhận</a></div>`;
        transporter.sendMail({
            from: "Lê Minh Thủy", // sender address
            to: req.body.email, // list of receivers
            subject: "Đăng ký tài khoản thành công ✔", // Subject line
            text: "Chúc mừng bạn đã đăng ký tài khoản từ trang web của chúng tôi", // plain text body
            html: html,
          }).then(info => {
            console.log({info});
          }).catch(console.error);
        console.log(newCustomer);
        res.json({message: 'Đăng ký thành công', status: true});
    }
};

