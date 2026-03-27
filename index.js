const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {courserouter } = require ('./routes/course');
const {userrouter} = require("./routes/user");
const {adminrouter} = require("./routes/admin");

const app = express();
dotenv.config({
    path: './.env',
});

app.use(express.json());
app.use("/api/v1/course" , courserouter);
app.use("/api/v1/user" , userrouter);
app.use("/api/v1/admin" , adminrouter);
mongoose.connect(process.env.DATABASE_URL);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

