const User = require("../model/user.model");
const Order = require("../model/order.model");
const constants = require("../utils/constants");

exports.create = async (req, res) => {

    try{
        const user = await User.findOne({userId : req.userId});

        const orderObj = {
            customerId : user._id,
            deliveryDate : req.body.deliveryDate,
            items : req.body.items,
            totalCost : req.body.totalCost,
            address : req.body.address  
        };

        const order = await Order.create(orderObj);

        if(order){
            user.ordersCreated.push(order._id);
            await user.save();
        }

        res.status(200).send(order);
    }catch(err){
        console.log("Error in creating order")
        res.status(500).send({
            message:"Internal error"
        })
    }
};

exports.getAllOrders = async (req, res) => {
    try{
        const user = await User.findOne({userId : req.userId});

        let response = [];
        if(user.userType == constants.userTypes.user){

            const ordersCreated = user.ordersCreated;

            for(let i=0; i < ordersCreated.length; i++){
                let order = await Order.findOne({_id : ordersCreated[i]});
                response.push(order);
            }
        }else{
            response = await Order.find();
        }

        res.status(200).send(response);
    }catch(err){
        console.log("Error occured while get orders details");
        res.status(500).send({
            message:"Some internal error happend"
        })
    }
};


exports.update = async (req, res) => {
    try{
        const user = await User.findOne({userId : req.userId});
        const order = await Order.findOne({_id : req.params.id});

        if(user.userType == constants.userTypes.admin){
            order.deliveryDate = req.body.deliveryDate != undefined ? req.body.deliveryDate : order.deliveryDate;
            order.totalCost = req.body.totalCost != undefined ? req.body.totalCost : order.totalCost;
            order.items = req.body.items != undefined ? req.body.items : order.items;
        }

        order.status = req.body.status != undefined ? req.body.status : order.status;
        order.address = req.body.address != undefined ? req.body.address : order.address;

        const updatedOrder = await order.save();

        res.status(200).send(updatedOrder);
        
    }catch(err){
        console.log("Error occured while updating order");
        res.status(500).send({
            message:"Internal server error"
        })
    }
};