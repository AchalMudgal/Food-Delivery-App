const express = require("express");
const app =  express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");

const configs = require("./configs/server.configs");
const constants = require("./utils/constants");
const User = require("./model/user.model");
const Order = require("./model/order.model");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(configs.DB_URL);
const db = mongoose.connection;
db.on("error",()=>{
    console.log("Error in db connection");
});
db.once("open",()=>{
    console.log("Connected to mongodb");
    init();
});

async function init(){
    try{
        await User.collection.drop();
        await Order.collection.drop();

        const user = await User.create({
            name : "admin1",
            userId : "admin1",
            email : "admin@gmail.com",
            password : bcryptjs.hashSync("adminPassword", 8),
            userType : constants.userTypes.admin
        });

        console.log(user);
    }catch(err){
        console.log("Error in db initialization", err);
    }
};

require("./routes/auth.routes")(app);
require("./routes/order.routes")(app);

app.listen(configs.PORT, ()=>{
    console.log("Server is running at PORT : ", configs.PORT);
});