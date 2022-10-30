const {product} = require('../model/product');
exports.getProduct = async (req, res, next) => {
    const getProduct = await product.find();
    res.json(getProduct);
}