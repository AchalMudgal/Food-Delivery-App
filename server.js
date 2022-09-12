const express = require("express");
const app =  express();

const mongoose = require("mongoose");

const configs = require("./configs/server.configs");

mongoose.connect(configs.DB_URL);
const db = mongoose.connection;
db.on("error",()=>{
    console.log("Error in db connection");
});
db.once("open",()=>{
    console.log("Connected to mongodb");
});



app.listen(configs.PORT, ()=>{
    console.log("Server is running at PORT : ", configs.PORT);
});