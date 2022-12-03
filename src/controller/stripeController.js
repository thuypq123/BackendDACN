const express = require('express');
const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {order} = require('../model/orders');
const jwt = require('jsonwebtoken');
// const endpointSecret = "whsec_e47ca8451547df7d1887e23c76dc388251e3374ccb57c988bee43eb40b7bce32";
exports.postStripe = async (req, res) => {
  const {token, amount, email, name, address, city, state, zip, country, phone, description, orderID} = req.body;
    const customer_email = jwt.verify(req.body.token, process.env.SECRET).email;
    const line_items = req.body.products.map(item => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.img],
                    description: item.des,
                    metadata:{
                        id: item._id
                    }
                },
                unit_amount: parseInt(item.price),
            },
            quantity: item.quantity,
        }
    });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {allowed_countries: ['US', 'CA','VN']},
    customer_email: customer_email,
    line_items,
    metadata: {
      token: token,
    },
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/checkout',
  });
  res.json({ url: session.url });
};

exports.postSuccess = async (request, response) => {
  
    const event = request.body;
    switch (event.type) {
      case 'checkout.session.completed':
        const token = event.data.object.metadata.token;
        const customer_id = jwt.verify(token, process.env.SECRET)._id;
        const customerOrder = await order.findOne({customer: customer_id, saved:false});
        customerOrder.saved = true;
        await customerOrder.save();
        response.status(200);
        break;
      case 'invoice.payment_succeeded':
        response.status(400).end();
        break;
      default:
        response.status(400).end();
    }
  
    response.send();
    console.log(request.body.type);
  };
  