const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const {customer} = require('../model/customer');
const {product} = require('../model/product');
const {order} = require('../model/orders');
const {orderDetail} = require('../model/orderDetail');
const {category} = require('../model/category');
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return DEFAULT_ADMIN
  }
  return null
}

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})
const adminOptions = {
  resources: [customer,product,order,orderDetail,category],
}

const secret = 'very_secret_secret';
const admin = new AdminJS(adminOptions);
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookiePassword: 'very_secret_secret',
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret,
    },
  )

  module.exports = adminRouter;