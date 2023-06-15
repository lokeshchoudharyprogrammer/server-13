const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { UserModel } = require("../Model/User.Schema");

//register the user
userRouter.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user with the email already exists
        const existingUser = await UserModel.findOne({ email });
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            // create a new user
            const user = new UserModel({
                email,
                password: hash

            });
            await user.save();

            // return success message
            res.status(201).json({ message: "User created successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//login users
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        { userId: user._id, userName: user.name },
                        "shhhhh"
                    );

                    //console.log(result, user, token);

                    res
                        .status(200)
                        .json({
                            message: "Login Sucessful",
                            token,
                            Name: user.name,
                            userId: user._id,
                        });
                } else {
                    res.status(401).json({ message: "Wrong Credentials" });
                }
            });
        } else {
            res.status(401).json({ message: "Wrong Credentials" });
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//get all the users
userRouter.get("/", async (req, res) => {

    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = { userRouter };