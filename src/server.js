const express = require('express');
require('dotenv').config()
const cors = require('cors');
var bodyParser = require('body-parser')
const {connect} = require('./database/dbConnect');
var cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3002;
const adminRouter = require('./router/adminRouter')
app.use('/admin', adminRouter);
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.json({ strict: false }))
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });


const userAuthRouter = require('./router/userAuth');
const productRouter = require('./router/productRouter');
const orderCustomerRouter = require('./router/orderCustomerRouter');
const detailProduct = require('./router/detailRouter');
const addCardRouter = require('./router/addCardRouter');
const checkoutRouter = require('./router/checkOutRouter');
const verifyEmailRouter = require('./router/verifyEmailRouter');
const resetMailRouter = require('./router/resetMailRouter');
const profileRouter = require('./router/profileRouter');


app.use('/user',userAuthRouter);
app.use('/products',productRouter);
app.use('/order',orderCustomerRouter);
app.use('/detail',detailProduct);
app.use('/addcard',addCardRouter);
app.use('/checkout',checkoutRouter);
app.use('/verify',verifyEmailRouter);
app.use('/reset',resetMailRouter);
app.use('/profile',profileRouter);

app.listen(port, connect() );
