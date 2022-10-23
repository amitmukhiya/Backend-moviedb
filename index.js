const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userData = require("./userdata");
const jwt=require('jsonwebtoken')

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://amitmukhiya:nRpqCddfbj037jIn@moviedb.8wzc9yl.mongodb.net/test", { useNewUrlParser: true });
// password : nRpqCddfbj037jIn



 app.use('/api', require('./Routes/userRoutes'))

const port=process.env.PORT||5000;
app.listen(port, () => {
    console.log("server is running on port:5000");
});
