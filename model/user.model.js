//User model

const mongoose = require("mongoose");
const constants = require("../utils/constants");

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true,
            trim: true
        },
        email : {
            type : String,
            required : true,
            trim : true,
            minLength : 5,
            lowercase : true,
            unique : true
        },
        userId : {
            type : String,
            required : true,
            trim : true,
            unique : true
        },
        password : {
            type : String,
            required : true,
            trim : true,
            minLength : 8
        },
        userType : {
            type : String,
            default : constants.userTypes.user,
            enum : [constants.userTypes.admin, constants.userTypes.user]
        },
        ordersCreated : {
            type : [mongoose.SchemaType.objectId],
            ref : "Order"
        }
    },
    {
        timestamps : true, versionKey : false
    }
);

module.exports = mongoose.model("User", userSchema);