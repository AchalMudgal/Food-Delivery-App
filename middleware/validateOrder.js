const Order = require("../model/order.model");

const validateOrderRequestBody = (req, res, next) => {
    try{
        if(!req.body.deliveryDate || !req.body.items || !req.body.totalCost || req.body.address){
            return res.status(400).send({
                message : "Required feild must provided [deliveryDate, items, totalCost, address]"
            })
        }
        next();
    }catch(err){
        console.log("Error in validating order body");
        res.status(500).send({
            message:"Internal server Error"
        })
    }
};

module.exports = {
    validateOrderRequestBody : validateOrderRequestBody
};