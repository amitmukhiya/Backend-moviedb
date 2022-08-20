const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const User = require("./userdata");
const jwt=require('jsonwebtoken')

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/movie");

// For user Registration
app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            password1: req.body.password1,
        })
        res.send(user);
    } catch (error) {
        console.log(error);
    }
});

// For user login
app.post("/api/login", async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (user) {
        const token=jwt.sign({
            email:user.email,
        }, 'secret@123')
        return res.json({ status: "ok", user: token });
    } else {
        return res.json({ status: "error", user: "false" });
    }
});

const port=process.env.PORT||5000;
app.listen(port, () => {
    console.log("server is running on port:5000");
});
