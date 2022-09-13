const mongoose = require("mongoose");
const constants = require("../utils/constants");

const orderSchema = new mongoose.Schema(
    {
        customerId : {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "User"
        },
        deliveryDate : {
            type : Date,
            required : true,
            trim : true
        },
        status : {
            type : String,
            default : constants.orderStatus.in_progress,
            enum : [constants.orderStatus.in_progress, constants.orderStatus.success, constants.orderStatus.cancelled]
        },
        items : {
            type : [String],
            required : true
        },
        totalCost : {
            type : Number,
            required : true,
            trim : true
        },
        address : {
            type : String,
            trim : true,
            required : true
        }
    },
    {
        timestamps : true, versionKey : false
    }
);

module.exports = mongoose.model("Order", orderSchema);