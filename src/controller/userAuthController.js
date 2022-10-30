const {customer} = require('../model/customer');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

exports.postLogin = async (req, res) => {
    const exitsCustomer = await customer.findOne({email: req.body.email});
    if(exitsCustomer){
        if(exitsCustomer.password === req.body.password){
            console.log(exitsCustomer+ 'đã đăng nhập'+req.body.password);
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
        await customer.create({
        fullname: req.body.fullname,
        avatar: "http://loremflickr.com/640/480/nightlife",
        email: req.body.email,
        password: req.body.password,
        phone: '',
        address: '',
        status: false,
        created_at: Date.now(),
        });
        console.log(req.body);
        res.json({message: 'Đăng ký thành công', status: true});
    }
};

