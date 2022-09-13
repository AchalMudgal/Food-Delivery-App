const User = require("../model/user.model");
const constants = require("../utils/constants");

const validateSignupRequestBody = async (req, res, next) => {

    //validate if name is present
    if(!req.body.name){
        return res.status(400).send({
            message:"Failed! User name is not provided"
        });
    }

    //Validate if userId is present and if its not duplicate
    if(!req.body.userId){
        return res.status(400).send({
            message:"Failed! userId is not provided"
        })
    };

    try{
        const user = await User.findOne({userId : req.body.userId});

        if(user != null){
            return res.status(400).send({
                message:"Failed! UserId is already taken"
            });
        }
    }catch(err){
        return res.status(500).send({
            message:"Some internal error while validateing the userId"
        })
    };

    //Validate if password is present or not
    if(!req.body.password){
        return res.status(400).send({
            message:"Failed! Password is not provided"
        })
    };

    //Validate if email is present
    if(!req.body.email){
        return res.status(400).send({
            message:"Failed! Email is not provided"
        })
    };
    
    //Validate if userType is present and admin signup is allowed
    if(!req.body.userType){
        return res.status(400).send({
            message:"Failed! userType is not provided"
        })
    };

    if(req.body.userType == constants.userTypes.admin){
        return res.status(400).send({
            message:"ADMIN registration not allowed"
        })
    };

    const userTypes = constants.userTypes.user;

    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message:"UserType provided is not correct.Possile userType is USER"
        });
    }

    next();
};


const validateSignInRequestBody = (req, res, next) => {
    
    //Validate if the userId is present
    if(!req.body.userId){
        return res.status(400).send({
            message:"Failed! userId is not provided"
        });
    }

    //Validate if password is present or not
    if(!req.body.password){
        return res.status(400).send({
            message:"Failed! password is not provided"
        })
    };

    next();
};

const verifyRequestBodiesForAuth = {
    validateSignupRequestBody : validateSignupRequestBody,
    validateSignInRequestBody : validateSignInRequestBody
};

module.exports = verifyRequestBodiesForAuth;

