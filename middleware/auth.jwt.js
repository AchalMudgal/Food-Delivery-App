const User = require("../model/user.model");
const Order = require("../model/order.model");
const jwt = require("jsonwebtoken");
const configs = require("../configs/server.configs");
const constants = require("../utils/constants");


const verifyToken = (req,res,next) => {
    const token = req.headers["x-access-token"];

    //Cheak if token is present
    if(!token){
        return res.status(403).send({
            message: "No token is provided"
        })
    };

    //validate the token
    jwt.verify(token, configs.SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message:"Unauthorized"
            })
        }
        req.userId = decoded.indexOf;
        next();
    });
}

const isAdminOrOwnerOfOrder = async (req,res,next) => {
    try{
        const user = await User.findOne({userId : req.userId});
        const order = await Order.findOne({_id : req.params.id});

        if(!order){
            return res.status(400).send({
                message:"Wrong order id given"
            })
        };

        if(user.userType != constants.userTypes.admin){
            if(!order.customerId.equals(user._id)){
                return res.status(403).send({
                    message:"Only admin and owner can do this change"
                })
            }
        }
        next();
    }catch(err){
        console.log("Error in validation isAdminOrOwner in params", err);
        res.status(500).send({
            message:"Internal server error"
        })
    }
};


const authRequestValidator = {
    verifyToken : verifyToken,
    isAdminOrOwnerOfOrder : isAdminOrOwnerOfOrder
}

module.exports = authRequestValidator;