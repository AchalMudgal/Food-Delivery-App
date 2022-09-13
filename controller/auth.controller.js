const User = require("../model/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs = require("../configs/server.configs");

exports.signup = async (req, res) => {

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcryptjs.hashSync(req.body.password, 8),
        userType : req.body.userType
    };

    try{
        const userCreate = await User.create(userObj);

        const response = {
            name : userCreate.name,
            userId : userCreate.userId,
            email : userCreate.email,
            userType : userCreate.userType
        }

        res.status(201).send(response);
    }catch(err){
        console.log("Internal error");
        res.status(500).send({
            message : "Some internal error"
        })
    }
};

exports.signin = async (req,res) => {
  try{     
    const user = await User.findOne({userId : req.body.userId});

    if(!user){
        return res.status(400).send({
            message:"userId passed is not valid"
        })
    };

    const isValidPassword = bcryptjs.compareSync(req.body.password, user.password);

    if(!isValidPassword){
        return res.status(401).send({
            message:"Incorrect password"
        })
    };

    const token = jwt.sign({id : user.userId}, configs.SECRET_KEY, {expiresIn : 60000});

    const response = {
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accessToken : token
    }

    res.status(200).send(response);
  }catch(err){
    console.log("Internal error while signIn");
    res.status(500).send({
        message:"Some internal error"
    })
  }    
};