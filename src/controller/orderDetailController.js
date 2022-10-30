exports.getOrderDetail = async (req, res, next) => {
    const getOrderDetail = await orderDetail.find();
    res.json(getOrderDetail);
}