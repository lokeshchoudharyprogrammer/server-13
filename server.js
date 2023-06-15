const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserRouter, userRouter } = require('./Routes/User.Router');
const { BlogRouter } = require('./Routes/Blogs.Router');
const cors = require("cors");
const { UserModel } = require('./Model/User.Schema');
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/user", UserRouter)
app.use("/blog", BlogRouter)




app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("<h1>Hello WelCome To My Server </h1>")
})
app.listen(3500, () => {

    try {

        mongoose.connect('mongodb+srv://lokesh:lokeshcz@cluster0.dsoakmx.mongodb.net/blogapp?retryWrites=true&w=majority')
        console.log("Connected Now")
    } catch {
        console.log("Not Connected Now")

    }
})