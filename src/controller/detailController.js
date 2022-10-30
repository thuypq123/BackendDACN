const {product} = require('../model/product');

exports.getProduct = async (req, res) => {
    const productDetail = await product.find({_id: req.params.id});
    res.json(productDetail);
}
