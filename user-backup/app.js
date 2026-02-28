const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const connect = require("./db/db");
connect();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))


app.use("/", userRoute);


module.exports = app;